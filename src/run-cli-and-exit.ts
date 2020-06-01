import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CLI_TERSE_ERROR } from './cli-terse-error';
import { RED_ERROR } from './constants';
import { RunCli, CliEnhancer } from './run-cli';
import { UsageString } from './usage-string';
import { ICliBranch } from './cli-branch';
import { ICliLeaf } from './cli-leaf';

export type RunCliAndExitOptions = Partial<{
  args: string[];
  enhancer: CliEnhancer;
  processExit: (code?: number) => any;
  consoleLog: typeof console.log;
  consoleError: typeof console.error;
}>;

export async function runCliAndExit(
  rootCommand: ICliBranch | ICliLeaf<any, any, any>,
  options: RunCliAndExitOptions = {},
): Promise<void> {
  const {
    args = process.argv.slice(2),
    enhancer,
    processExit = process.exit,
    consoleLog = console.log, // eslint-disable-line no-console
    consoleError = console.error, // eslint-disable-line no-console
  } = options;
  const runCli = RunCli(rootCommand, { enhancer });
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
      const FALLBACK_COMMAND_STACK = { current: rootCommand, parents: [] };
      const usageString = UsageString(exception.commandStack || FALLBACK_COMMAND_STACK);
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
