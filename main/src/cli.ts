import { CLI_TERSE_ERROR } from './cli-terse-error';
import { ICliApi, CliApi } from './cli-api';
import { UsageString } from './usage-string';
import { CLI_USAGE_ERROR, CliUsageError } from './cli-usage-error';
import { ansiColors } from './util';
import { TCliRoot } from './cli-tree';
import { splitCommandLine } from './split-command-line';

/** Options for [[`Cli`]] */
export interface ICliOptions {
	/** Defaults to `process.stdout.columns` or 80 */
	columns?: number;

	/** Use ANSI escape codes in usage. Defaults to true */
	colors?: boolean;

	/** Called on the result of the command defaulting to `console.log` */
	consoleLog?: typeof console.log;

	/** Called on errors and exceptions defaulting to `console.error` */
	consoleError?: typeof console.error;

	/** Called after the command has completed defaulting to `process.exit` */
	processExit?: (code?: number) => any;
}

/**
 * Type of an [[`ICli.run`]]
 */
export interface ICliRun {
	/**
	 * @param args Command line arguments parsed and passed into the command
	 * action. Defaults to `process.argv.slice(2)` in Node.js.
	 * @returns The resolved value of the command action
	 * */
	(args?: string[]): Promise<number>;
}

/**
 * Type of an [[`ICli.runLine`]]
 */
export interface ICliRunLine {
	/**
	 * @param line A command line parsed and split into args for [[`run.cli`]]
	 * @returns The resolved value of the command's action
	 * */

	(line?: string): Promise<number>;
}

/**
 * A command-line interface (CLI) created by [[`Cli`]]
 */
export interface ICli {
	/** Programmatic interface for the CLI, useful for unit testing */
	api: ICliApi;
	/** Run the command-line interface, console.log the result, and exit */
	run: ICliRun;
	/** Split a command line into args and call [[`ICli.run`]] */
	runLine: ICliRunLine;
}

// By default, cli.run will call `process.exit` after the if `process` is defined in
// the current global context and  (i.e. if we are in a Node.js environment) but also safe for a browser
function DEFAULT_PROCESS_EXIT(code?: number): void {
	if (typeof process === 'object' && typeof process.exit === 'function') {
		process.exit(code);
	}
}

const DEFAULT_ARGS: string[] =
	typeof process === 'object' && Array.isArray(process.argv)
		? process.argv.slice(2)
		: [];

const DEFAULT_COLUMNS =
	typeof process === 'object' &&
	typeof process.stdout === 'object' &&
	process.stdout.columns
		? process.stdout.columns
		: 80;

/**
 * A factory for [[`ICli`]]s
 *
 * @param root The root of this command-line interface's command tree
 * @param options Optional properties and callbacks
 * @returns A command-line interface object
 * */
export function Cli(root: TCliRoot, options: ICliOptions = {}): ICli {
	const {
		columns = DEFAULT_COLUMNS,
		colors = true,
		consoleLog = console.log, // eslint-disable-line no-console
		consoleError = console.error, // eslint-disable-line no-console
		processExit = DEFAULT_PROCESS_EXIT,
	} = options;

	const RED_ERROR = colors ? ansiColors.red('Error:') : 'Error:';

	const api = CliApi(root);

	return {
		api,
		run,
		runLine,
	};

	async function runLine(line = '') {
		const { args, quoteChar } = splitCommandLine(line);
		if (quoteChar) {
			consoleError(`${RED_ERROR} Unterminated ${quoteChar}-quoted string`);
			const exitCode = 1;
			processExit(exitCode);
			return exitCode;
		}
		return await run(args);
	}

	async function run(args = DEFAULT_ARGS) {
		let exitCode = 0;
		try {
			const result = await api(args);
			if (typeof result !== 'undefined') {
				consoleLog(result);
			}
		} catch (exception) {
			exitCode = 1;
			if (!exception) {
				consoleError(
					`${RED_ERROR} Encountered non-truthy exception "${exception}". Please contact the author of this command-line interface`,
				);
			} else if (exception.code === CLI_USAGE_ERROR) {
				const exceptionAsUsageError: CliUsageError = exception;
				if (exceptionAsUsageError.tree) {
					const usageString = UsageString(exception.tree, columns, '   ');
					if (exception.message) {
						consoleError(`${usageString}\n\n${RED_ERROR} ${exception.message}`);
					} else {
						consoleError(usageString);
					}
				} else {
					// Handle case where "code" is CLI_USAGE_ERROR but "tree" is undefined. Surely
					// this is a coding mistake on our part.
					consoleError(exceptionAsUsageError);
				}
			} else if (exception.code === CLI_TERSE_ERROR) {
				if (!exception.message) {
					consoleError(exception);
				} else {
					consoleError(`${RED_ERROR} ${exception.message}`);
				}
			} else if (typeof exception.code === 'number') {
				exitCode = exception.code;
				if (exception.message) {
					consoleError(exception.message);
				}
			} else {
				consoleError(exception);
			}
		} finally {
			if (processExit) {
				processExit(exitCode);
			}
		}
		return exitCode;
	}
}
