import { CLI_TERSE_ERROR } from './cli-terse-error';
import { UsageString } from './usage-string';
import { CLI_USAGE_ERROR, CliUsageError } from './cli-usage-error';
import { ansiColors } from './util';
import { CliConsole } from './cli-console';
import { CliProcess } from './cli-process';
import { ICli, ICliOptions } from './cli-interface';

/**
 * A factory for [[`ICli`]]s
 *
 * @param root The root of this command-line interface's command tree
 * @param options Optional properties and callbacks
 * @returns A command-line interface object
 * */
export function CliRun(
	api: ICli['api'],
	options: ICliOptions = {},
): ICli['run'] {
	const console = CliConsole();
	const process = CliProcess();
	const {
		ansi = true,
		columns = process.stdout.columns,
		consoleLog = console.log,
		consoleError = console.error,
		processExit = process.exit,
	} = options;

	const RED_ERROR = ansi ? ansiColors.red('Error:') : 'Error:';

	return async function run(args = process.argv.slice(2)) {
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
		}
		processExit(exitCode);
		return exitCode;
	};
}
