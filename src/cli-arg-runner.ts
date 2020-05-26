import { AnyCommand } from './types';
import { accumulateCommandStack } from './accumulate-command-stack';
import { accumulateArgs } from './accumulate-args';
import { accumulateNamedValues } from './accumulate-named-values';
import { CliUsageError } from './cli-usage-error';
import { CliTerseError } from './cli-terse-error';
import { CLI_BRANCH } from './constants';
import { findVersion } from './find-version';
import { callParse } from './call-parse';
import { LastCommand } from './last-command';

export type CliArgRunner = (...args: string[]) => Promise<any>;

export type CliEnhancer = (argRunner: CliArgRunner) => CliArgRunner;

export function CliArgRunner(
  rootCommand: AnyCommand,
  options: Partial<{ enhancer: CliEnhancer }> = {},
): CliArgRunner {
  const { enhancer } = options;

  if (enhancer) {
    return enhancer(cliArgRunner);
  }

  return cliArgRunner;

  async function cliArgRunner(...args: string[]) {
    if (['-v', '--version'].includes(args[0])) {
      const version = await findVersion();
      if (!version) {
        throw new CliTerseError('Failed to find a "version" string');
      }
      return version;
    }

    const {
      foundHelp,
      commandNamesAndPositionalArgs,
      namedArgs,
      escapedArgs,
    } = accumulateArgs(args);

    const restCommandNamesAndPositionalArgs = accumulateCommandStack(
      rootCommand,
      commandNamesAndPositionalArgs,
    );

    if (foundHelp) {
      // E.g.:
      //   cli branch0 branch1 --help
      // Same as:
      //   cli --help branch0 branch1
      throw new CliUsageError();
    }

    const lastCommand = LastCommand(rootCommand);

    if (lastCommand.commandType === CLI_BRANCH) {
      if (restCommandNamesAndPositionalArgs[0]) {
        // E.g. cli branch0 branch1 bad-command-name
        throw new CliUsageError(`Bad command "${restCommandNamesAndPositionalArgs[0]}"`);
      }
      // E.g. cli branch0 branch1
      throw new CliUsageError();
    }

    let argsValue: any;
    if (lastCommand.positionalArgParser) {
      // Note that for named and escaped args, we distinguish between
      // `undefined` and `[]`. For example, "cli" gives an escaped args
      // `undefined` whereas "cli --" gives an escaped args `[]`. For the
      // "positionalArgs", however, there is no such distinction. By convention,
      // we elect here to pass in `undefined` rather than an empty array when no
      // positional arguments are passed.
      const positionalArgs =
        restCommandNamesAndPositionalArgs.length > 0
          ? restCommandNamesAndPositionalArgs
          : undefined;
      argsValue = await callParse(lastCommand.positionalArgParser, positionalArgs);
    } else if (restCommandNamesAndPositionalArgs.length > 0) {
      throw new CliUsageError(
        `Unexpected argument "${restCommandNamesAndPositionalArgs[0]}" : Command "${lastCommand.name}" does not accept positional arguments`,
      );
    }

    const namedValues = await accumulateNamedValues(
      lastCommand.namedArgParsers || {},
      namedArgs,
    );

    let escapedValue: any;
    if (lastCommand.escapedArgParser) {
      escapedValue = await callParse(lastCommand.escapedArgParser, escapedArgs, '--');
    } else if (escapedArgs) {
      throw new CliUsageError(
        `Command "${lastCommand.name}" does not allow "--" as an argument`,
      );
    }

    const result = await lastCommand.action(argsValue, namedValues, escapedValue);
    return result;
  }
}
