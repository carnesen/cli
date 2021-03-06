import { CLI_TERSE_ERROR } from './cli-terse-error';
import { UsageString } from './usage-string';
import { CLI_USAGE_ERROR, CliUsageError } from './cli-usage-error';
import { CliConsole } from './cli-console';
import { CliProcess } from './cli-process';
import { ICli, ICliOptions } from './cli-options';
import { CliAnsi } from './cli-ansi';

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
	const process = CliProcess();
	const { console = CliConsole(), done = process.exit } = options;

	return async function run(args = process.argv.slice(2)) {
		let exitCode = 0;
		try {
			// Invoke the `api` function with the provided string args
			const result = await api(args);
			if (typeof result !== 'undefined') {
				console.log(result);
			}
		} catch (exception) {
			handleExceptionThrownByApi(exception, options);
			exitCode =
				typeof exception.exitCode === 'number' && exception.exitCode !== 0
					? exception.exitCode
					: 1;
		} finally {
			try {
				done(exitCode);
			} catch (exception) {
				console.error('"done" callback threw');
				console.error(exception);
			}
		}
		return exitCode;
	};
}

/**
 * Handle any exception thrown by `api`
 * @param exception Any exception thrown by the `api` function
 * @param options Options passed to the top-level Cli
 */
function handleExceptionThrownByApi(
	exception: any,
	options: ICliOptions,
): void {
	const { columns = process.stdout.columns, console = CliConsole() } = options;
	const ansi = CliAnsi(options.ansi);

	// This should never happen
	if (!exception) {
		console.error(
			`${ansi.red(
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
				const usageString = UsageString(exceptionAsUsageError.tree, {
					columns,
					indentation: '   ',
					ansi,
				});
				if (exception.message) {
					console.error(
						`${usageString}\n\n${ansi.red('Error:')} ${exception.message}`,
					);
				} else {
					console.error(usageString);
				}
			} else {
				// Handle case where "code" is CLI_USAGE_ERROR but "tree" is
				// undefined. Surely this is a coding mistake on our part.
				console.error(exceptionAsUsageError);
			}
			break;
		}
		case CLI_TERSE_ERROR: {
			if (!exception.message) {
				console.error(exception);
			} else {
				console.error(`${ansi.red('Error:')} ${exception.message}`);
			}
			break;
		}
		default: {
			console.error(exception);
		}
	}
}
