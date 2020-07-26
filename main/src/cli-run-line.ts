import { ansiColors } from './util';
import { splitCommandLine } from './split-command-line';
import { CliConsole } from './cli-console';
import { CliProcess } from './cli-process';
import { ICli, ICliOptions } from './cli-interface';

/**
 * A factory for [[`ICli.runLine`]]s
 *
 * @param run
 * @param options
 * @returns An async function that runs the provided command line
 * */
export function CliRunLine(
	run: ICli['run'],
	options: ICliOptions = {},
): ICli['runLine'] {
	const console = CliConsole();
	const process = CliProcess();
	const {
		ansi = true,
		consoleError = console.error,
		processExit = process.exit,
	} = options;

	const RED_ERROR = ansi ? ansiColors.red('Error:') : 'Error:';

	return async function runLine(line = '') {
		const { args, quoteChar } = splitCommandLine(line);
		if (quoteChar) {
			consoleError(`${RED_ERROR} Unterminated ${quoteChar}-quoted string`);
			const exitCode = 1;
			processExit(exitCode);
			return exitCode;
		}
		return await run(args);
	};
}
