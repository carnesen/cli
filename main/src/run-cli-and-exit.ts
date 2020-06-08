import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CLI_TERSE_ERROR } from './cli-terse-error';
import { RunCli, ICliEnhancer } from './run-cli';
import { UsageString } from './usage-string';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';

function red(message: string) {
  return `\u001b[31m${message}\u001b[39m`;
}

export const RED_ERROR = red('Error:');

/** Options for {@linkcode runCliAndExit} */
export type RunCliAndExitOptions = {
  /** Command-line arguments defaulting to `process.argv.slice(2)` */
  args?: string[];

  /** (Advanced) Modify the CLI's behavior. Passed to {@linkcode RunCli} */
  enhancer?: ICliEnhancer;

  /** Called after the command has completed defaulting to `process.exit` */
  processExit?: (code?: number) => any;

  /** Called on the result of the command defaulting to `console.log` */
  consoleLog?: typeof console.log;

  /** Called on errors and exceptions defaulting to `console.error` */
  consoleError?: typeof console.error;
};

/**
 * Run a command-line interface and exit
 *
 * @param root The root of this CLI's command tree
 * */
export async function runCliAndExit(
  root: ICliBranch | ICliCommand<any, any, any>,
  options: RunCliAndExitOptions = {},
): Promise<void> {
  const {
    args = process.argv.slice(2),
    enhancer,
    processExit = process.exit,
    consoleLog = console.log, // eslint-disable-line no-console
    consoleError = console.error, // eslint-disable-line no-console
  } = options;
  const runCli = RunCli(root, { enhancer });
  let exitCode = 0;
  try {
    const result = await runCli(...args);
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
      const FALLBACK_COMMAND_STACK = { current: root, parents: [] };
      const usageString = UsageString(exception.node || FALLBACK_COMMAND_STACK);
      if (exception.message) {
        consoleError(`${usageString}\n\n${RED_ERROR} ${exception.message}`);
      } else {
        consoleError(usageString);
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
    processExit(exitCode);
  }
}
