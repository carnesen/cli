import { CliRoot } from './cli-tree';
import { CliOptions } from './cli-options';
import { CliConsoleLogger } from './cli-console-logger';
import { cliColorFactory } from './cli-color-factory';
import { navigateCliTree } from './navigate-cli-tree';
import { CLI_COMMAND } from './cli-command';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { partitionArgs } from './partition-args';
import { parseArgs } from './parse-args';
import { parseNamedArgs } from './parse-named-args';
import { cliProcessFactory } from './cli-process';
import { usageFactory } from './usage-string';
import { CLI_TERSE_ERROR } from './cli-terse-error';
import { splitCommandLine } from './split-command-line';

export class CCli {
	private readonly color =
		this.options.color ?? cliColorFactory(this.options.ansi);

	private readonly logger =
		this.options.logger ?? this.options.console ?? CliConsoleLogger.create();

	protected constructor(
		private readonly root: CliRoot,
		private readonly options: CliOptions,
	) {}

	/** Programmatic interface for the CLI. Mostly used for unit testing
	 * @param args Command-line argument strings
	 * @returns A promise resolving to the command action's return value */
	public async api(args: string[]): Promise<any> {
		const navigated = navigateCliTree(this.root, args);

		if (navigated.message || navigated.tree.current.kind !== CLI_COMMAND) {
			throw new CliUsageError(navigated.message, navigated.tree);
		}

		const { positionalArgs, namedArgs, doubleDashArgs } = partitionArgs(
			navigated.args,
		);

		// We found "--help" among the arguments
		if (namedArgs.help) {
			throw new CliUsageError(undefined, navigated.tree);
		}

		const command = navigated.tree.current;

		// Pre-validation for positional argument group
		if (!command.positionalArgGroup && positionalArgs.length > 0) {
			throw new CliUsageError(
				`Unexpected argument "${positionalArgs[0]}" : Command "${command.name}" does not accept positional arguments`,
				navigated.tree,
			);
		}

		// All validation for named argument groups is done during parsing

		// Pre-validation for double-dash argument group
		if (!command.doubleDashArgGroup && doubleDashArgs) {
			throw new CliUsageError(
				`Command "${command.name}" does not allow "--" as an argument`,
			);
		}

		// Calls to `parseArgs` and `action` in this try/catch block could throw
		// `CliUsageError`, which we catch and enhance with the current `TCliTree`
		// context.
		try {
			let positionalValue: any;
			if (command.positionalArgGroup) {
				// Note that for named and double-dash args, we distinguish between
				// `undefined` and `[]`. For example, "cli" gives an double-dash args
				// `undefined` whereas "cli --" gives an double-dash args `[]`. For the
				// "positionalArgs", however, there is no such distinction. By convention,
				// we elect here to pass in `undefined` rather than an empty array when no
				// positional arguments are passed.
				positionalValue = await parseArgs(
					command.positionalArgGroup,
					positionalArgs.length > 0 ? positionalArgs : undefined,
					undefined,
				);
			}

			const namedValues = await parseNamedArgs(
				command.namedArgGroups || {},
				namedArgs,
			);

			let doubleDashValue: any;
			if (command.doubleDashArgGroup) {
				doubleDashValue = await parseArgs(
					command.doubleDashArgGroup,
					doubleDashArgs,
					'--',
				);
			}

			const result = await command.action({
				ansi: this.color,
				color: this.color,
				console: this.logger,
				doubleDashValue,
				namedValues,
				positionalValue,
				logger: this.logger,
			});
			return result;
		} catch (exception) {
			// Check if the thrown exception is an instance of CliUsageError. If
			// so, attach the current command tree context.
			if (exception instanceof CliUsageError) {
				exception.tree = exception.tree ?? navigated.tree;
			}
			throw exception;
		}
	}

	/** Run the command-line interface, console.log the result, and exit
	 * @param args Command-line arguments to be parsed and passed into the
	 * command action. Defaults to `process.argv.slice(2)` in Node.js.
	 * @returns A promise resolving to the command's exit code */
	public async run(args?: string[]): Promise<number> {
		const cliProcess = cliProcessFactory();

		let exitCode = 0;
		try {
			// Invoke the `api` function with the provided string args
			const result = await this.api(args ?? cliProcess.argv.slice(2));
			if (typeof result !== 'undefined') {
				this.logger.log(result);
			}
		} catch (exception: any) {
			this.handleException(exception);
			exitCode =
				typeof exception.exitCode === 'number' && exception.exitCode !== 0
					? exception.exitCode
					: 1;
		} finally {
			try {
				this.done(exitCode);
			} catch (exception) {
				this.logger.error('"done" callback threw');
				this.logger.error(exception);
			}
		}
		return exitCode;
	}

	/** Split a command line into args and call this `Cli`'s `run` method
	 * @param line A command line
	 * @returns A promise resolving to the command's exit code */
	public async runLine(line = ''): Promise<number> {
		const { args, quoteChar } = splitCommandLine(line);
		if (quoteChar) {
			this.logger.error(
				`${this.color.red('Error:')} Unterminated ${quoteChar}-quoted string`,
			);
			const exitCode = 1;
			try {
				this.done(exitCode);
			} catch (exception) {
				this.logger.error('"done" callback threw');
				this.logger.error(exception);
			}
			return exitCode;
		}
		return await this.run(args);
	}

	private done(code?: number): void {
		(this.options.done ?? cliProcessFactory().exit)(code);
	}

	private handleException(exception: any): void {
		const cliProcess = cliProcessFactory();
		const { columns = cliProcess.stdout.columns } = this.options;

		// This should never happen
		if (!exception) {
			this.logger.error(
				`${this.color.red(
					'Error:',
				)} Encountered non-truthy exception "${exception}". Please contact the author of this command-line interface`,
			);
			return;
		}

		// Special handling per exception.code
		switch (exception.code) {
			case CLI_USAGE_ERROR: {
				const exceptionAsUsageError: CliUsageError = exception;
				if (exceptionAsUsageError.tree) {
					const usageString = usageFactory(exceptionAsUsageError.tree, {
						columns,
						indentation: '   ',
						color: this.color,
					});
					if (exception.message) {
						this.logger.error(
							`${usageString}\n\n${this.color.red('Error:')} ${
								exception.message
							}`,
						);
					} else {
						this.logger.error(usageString);
					}
				} else {
					// Handle case where "code" is CLI_USAGE_ERROR but "tree" is
					// undefined. Surely this is a coding mistake on our part.
					this.logger.error(exceptionAsUsageError);
				}
				break;
			}
			case CLI_TERSE_ERROR: {
				if (!exception.message) {
					this.logger.error(exception);
				} else {
					this.logger.error(`${this.color.red('Error:')} ${exception.message}`);
				}
				break;
			}
			default: {
				this.logger.error(exception);
			}
		}
	}

	public static create(root: CliRoot, options: CliOptions = {}): CCli {
		return new CCli(root, options);
	}
}
