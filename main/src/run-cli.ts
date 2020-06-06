import { partitionArgs } from './partition-args';
import { getNamedValues } from './get-named-values';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { CliTerseError } from './cli-terse-error';
import { findVersion } from './find-version';
import { parseArgs } from './parse-args';
import { navigateToCommand } from './navigate-to-command';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';

/** A JavaScript command runner. Useful for unit testing CLI logic. */
export interface IRunCli {
  (...args: string[]): Promise<any>;
}

/** (Advanced) Wrap the default {@linkcode IRunCli} to modify its behavior */
export interface ICliEnhancer {
  (runCli: IRunCli): IRunCli;
}

export type RunCliOptions = { enhancer?: ICliEnhancer };

/**
 * A factory for {@linkcode IRunCli}s, the core of {@linkcode runCliAndExit}
 *
 * @param root The root of this CLI's command tree
 */
export function RunCli(
  root: ICliBranch | ICliCommand<any, any, any>,
  options: RunCliOptions = {},
): IRunCli {
  const { enhancer } = options;

  if (enhancer) {
    return enhancer(runCli);
  }

  return runCli;

  async function runCli(...args: string[]) {
    // If the very first argument is --version, return this software's version identifier.
    if (args[0] === '--version') {
      const version = await findVersion();
      if (!version) {
        throw new CliTerseError('Failed to find a "version" string');
      }
      return version;
    }

    const [locationInCommandTree, remainingArgs] = navigateToCommand(root, args);

    const { positionalArgs, namedArgs, escapedArgs } = partitionArgs(remainingArgs);
    if (namedArgs.help) {
      throw new CliUsageError(undefined, locationInCommandTree);
    }
    const command = locationInCommandTree.current;
    let argsValue: any;
    if (command.positionalParser) {
      // Note that for named and escaped args, we distinguish between
      // `undefined` and `[]`. For example, "cli" gives an escaped args
      // `undefined` whereas "cli --" gives an escaped args `[]`. For the
      // "positionalArgs", however, there is no such distinction. By convention,
      // we elect here to pass in `undefined` rather than an empty array when no
      // positional arguments are passed.
      argsValue = await parseArgs(
        command.positionalParser,
        positionalArgs.length > 0 ? positionalArgs : undefined,
        undefined,
        locationInCommandTree,
      );
    } else if (positionalArgs.length > 0) {
      throw new CliUsageError(
        `Unexpected argument "${positionalArgs[0]}" : Command "${command.name}" does not accept positional arguments`,
        locationInCommandTree,
      );
    }

    const namedValues = await getNamedValues(
      command.namedParsers || {},
      namedArgs,
      locationInCommandTree,
    );

    let escapedValue: any;
    if (command.escapedParser) {
      escapedValue = await parseArgs(
        command.escapedParser,
        escapedArgs,
        '--',
        locationInCommandTree,
      );
    } else if (escapedArgs) {
      throw new CliUsageError(
        `Command "${command.name}" does not allow "--" as an argument`,
      );
    }

    try {
      const result = await command.action(argsValue, namedValues, escapedValue);
      return result;
    } catch (exception) {
      if (exception && exception.code === CLI_USAGE_ERROR) {
        exception.locationInCommandTree = locationInCommandTree;
      }
      throw exception;
    }
  }
}
