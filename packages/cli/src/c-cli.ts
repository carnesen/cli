import { CCliRoot } from './c-cli-tree';
import { CCliConsoleLogger } from './c-cli-console-logger';
import { cCliColorFactory } from './c-cli-color-factory';
import { navigateCCliTree } from './navigate-cli-tree';
import { CCliUsageError } from './c-cli-usage-error';
import { partitionArgs } from './partition-args';
import { parseArgs } from './parse-args';
import { parseNamedArgs } from './parse-named-args';
import { CCliProcess, cCliProcessFactory } from './c-cli-process';
import { usageFactory } from './usage-string';
import { CCliTerseError } from './c-cli-terse-error';
import { splitCommandLine } from './split-command-line';
import { CCliCommand } from './c-cli-command';
import { CCliColor } from './c-cli-color';
import { CCliLogger } from './c-cli-logger';

/** Options for creating a **@carnesen/cli** CLI */
export type CCliOptions = {
	/** Enable/disable ANSI text color decoration
	 * @default process.stdout.isTTY && process.stderr.isTTY */
	ansi?: boolean;

	/** Text coloring methods. Takes precedence over the `ansi` option
	 * @default CliDefaultColor */
	color?: CCliColor;

	/** Number of terminal columns
	 * @default process.stdout.columns || 100 */
	columns?: number;

	/** @deprecated Use `logger` instead */
	console?: CCliLogger;

	/** Called after the command has completed. Defaults to `process.exit` */
	done?: CCliProcess['exit'];

	/** `CliLogger` object to use for the CLI. Defaults to the global `console`
	 * object. The CLI runner calls `logger.log` on the command's `action` return
	 * value if there is one. The CLI runner calls `logger.error` on the
	 * exception if one is thrown. The `logger` is injected into the command
	 * `action` too. */
	logger?: CCliLogger;
};

/** Main class implementing the **@carnesen/cli** command-line interface (CLI)
 * framework */
export class CCli {
	private readonly color =
		this.options.color ?? cCliColorFactory(this.options.ansi);

	private readonly logger =
		this.options.logger ?? this.options.console ?? CCliConsoleLogger.create();

	protected constructor(
		private readonly root: CCliRoot,
		private readonly options: CCliOptions,
	) {
		// Explicitly bind the public class methods to this instance
		this.api = this.api.bind(this);
		this.run = this.run.bind(this);
		this.runLine = this.runLine.bind(this);
	}

	/** Programmatic interface for the CLI. Mostly used for unit testing
	 * @param args Command-line argument strings
	 * @returns A promise resolving to the command action's return value */
	public async api(args: string[]): Promise<any> {
		const navigated = navigateCCliTree(this.root, args);

		if (navigated.message || !(navigated.tree.current instanceof CCliCommand)) {
			throw new CCliUsageError(navigated.message, navigated.tree);
		}

		const { positionalArgs, namedArgs, doubleDashArgs } = partitionArgs(
			navigated.args,
		);

		// We found "--help" among the arguments
		if (namedArgs.help) {
			throw new CCliUsageError(undefined, navigated.tree);
		}

		const command = navigated.tree.current;

		// Pre-validation for positional argument group
		if (!command.options.positionalArgGroup && positionalArgs.length > 0) {
			throw new CCliUsageError(
				`Unexpected argument "${positionalArgs[0]}" : Command "${command.options.name}" does not accept positional arguments`,
				navigated.tree,
			);
		}

		// All validation for named argument groups is done during parsing

		// Pre-validation for double-dash argument group
		if (!command.options.doubleDashArgGroup && doubleDashArgs) {
			throw new CCliUsageError(
				`Command "${command.options.name}" does not allow "--" as an argument`,
			);
		}

		// Calls to `parseArgs` and `action` in this try/catch block could throw
		// `CliUsageError`, which we catch and enhance with the current `TCliTree`
		// context.
		try {
			let positionalValue: any;
			if (command.options.positionalArgGroup) {
				// Note that for named and double-dash args, we distinguish between
				// `undefined` and `[]`. For example, "cli" gives an double-dash args
				// `undefined` whereas "cli --" gives an double-dash args `[]`. For the
				// "positionalArgs", however, there is no such distinction. By convention,
				// we elect here to pass in `undefined` rather than an empty array when no
				// positional arguments are passed.
				positionalValue = await parseArgs(
					command.options.positionalArgGroup,
					positionalArgs.length > 0 ? positionalArgs : undefined,
					undefined,
				);
			}

			const namedValues = await parseNamedArgs(
				command.options.namedArgGroups || {},
				namedArgs,
			);

			let doubleDashValue: any;
			if (command.options.doubleDashArgGroup) {
				doubleDashValue = await parseArgs(
					command.options.doubleDashArgGroup,
					doubleDashArgs,
					'--',
				);
			}

			const result = await command.options.action({
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
			if (exception instanceof CCliUsageError) {
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
		const cliProcess = cCliProcessFactory();

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
		(this.options.done ?? cCliProcessFactory().exit)(code);
	}

	private handleException(exception: any): void {
		const cliProcess = cCliProcessFactory();
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

		// Special handling per exception class
		if (exception instanceof CCliUsageError) {
			if (exception.tree) {
				const usageString = usageFactory(exception.tree, {
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
				// Handle case where "code" is a CCliUsageError but "tree" is
				// undefined. Surely this is a coding mistake on our part.
				this.logger.error(exception);
			}
		} else if (exception instanceof CCliTerseError) {
			if (!exception.message) {
				this.logger.error(exception);
			} else {
				this.logger.error(`${this.color.red('Error:')} ${exception.message}`);
			}
		} else {
			this.logger.error(exception);
		}
	}

	/** Factory for creating a **@carnesen/cli** command-line interface (CLI)
	 * @param root The "root" command or (most often) command group for the CLI
	 * @param options Advanced options for configuring the CLI */
	public static create(root: CCliRoot, options: CCliOptions = {}): CCli {
		return new CCli(root, options);
	}
}
