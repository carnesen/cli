import { CLI_TERSE_ERROR } from './cli-terse-error';
import { ICli } from './cli';
import { UsageString } from './usage-string';
import { CLI_USAGE_ERROR, CliUsageError } from './cli-usage-error';
import { ansiColors } from './util';

/** Options for [[`runCli`]] */
export interface IRunCliOptions {
	/** Command-line arguments defaulting to `process.argv.slice(2)` */
	args?: string[];

	/** Defaults to `process.stdout.columns` */
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

// By default, runCli will call `process.exit` after the if `process` is defined in
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
 * Run a command-line interface
 *
 * @param cli An `[[ICli]]`
 * @returns A Promise representing the command execution
 * */
export async function runCli(
	cli: ICli,
	options: IRunCliOptions = {},
): Promise<number> {
	const {
		args = DEFAULT_ARGS,
		columns = DEFAULT_COLUMNS,
		colors = true,
		consoleLog = console.log, // eslint-disable-line no-console
		consoleError = console.error, // eslint-disable-line no-console
		processExit = DEFAULT_PROCESS_EXIT,
	} = options;
	let exitCode = 0;
	const RED_ERROR = colors ? ansiColors.red('Error:') : 'Error:';

	try {
		const result = await cli(...args);
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
