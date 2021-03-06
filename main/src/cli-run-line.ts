import { splitCommandLine } from './split-command-line';
import { CliConsole } from './cli-console';
import { CliProcess } from './cli-process';
import { ICli, ICliOptions } from './cli-options';
import { CliAnsi } from './cli-ansi';

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
	const process = CliProcess();
	const { console = CliConsole(), done = process.exit } = options;

	const ansi = CliAnsi(options.ansi);

	return async function runLine(line = '') {
		const { args, quoteChar } = splitCommandLine(line);
		if (quoteChar) {
			console.error(
				`${ansi.red('Error:')} Unterminated ${quoteChar}-quoted string`,
			);
			const exitCode = 1;
			try {
				done(exitCode);
			} catch (exception) {
				console.error('"done" callback threw');
				console.error(exception);
			}
			return exitCode;
		}
		return await run(args);
	};
}
