import { AnyCommand } from './types';
import { partitionArgs } from './partition-args';
import { getNamedValues } from './get-named-values';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { CliTerseError } from './cli-terse-error';
import { findVersion } from './find-version';
import { parseArgs } from './parse-args';
import { navigateToLeaf } from './navigate-to-leaf';

export type RunCli = (...args: string[]) => Promise<any>;

export type CliEnhancer = (runCli: RunCli) => RunCli;

/**
 * 
 * @remarks
 * Returns a function of the form `(...args: string[]) => Promise<any>` that can be invoked as e.g. `cli('foo', 'bar')` for unit tests or as `cli(process.argv.slice(2))` in an executable CLI script.

 * @param rootCommand 
 * @param options 
 */
export function RunCli(
  rootCommand: AnyCommand,
  options: Partial<{ enhancer: CliEnhancer }> = {},
): RunCli {
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

    const [leafStack, remainingArgs] = navigateToLeaf(rootCommand, args);

    const { positionalArgs, namedArgs, escapedArgs } = partitionArgs(remainingArgs);
    if (namedArgs.help) {
      throw new CliUsageError(undefined, leafStack);
    }
    const leaf = leafStack.current;
    let argsValue: any;
    if (leaf.positionalArgParser) {
      // Note that for named and escaped args, we distinguish between
      // `undefined` and `[]`. For example, "cli" gives an escaped args
      // `undefined` whereas "cli --" gives an escaped args `[]`. For the
      // "positionalArgs", however, there is no such distinction. By convention,
      // we elect here to pass in `undefined` rather than an empty array when no
      // positional arguments are passed.
      argsValue = await parseArgs(
        leaf.positionalArgParser,
        positionalArgs.length > 0 ? positionalArgs : undefined,
        undefined,
        leafStack,
      );
    } else if (positionalArgs.length > 0) {
      throw new CliUsageError(
        `Unexpected argument "${positionalArgs[0]}" : Command "${leaf.name}" does not accept positional arguments`,
        leafStack,
      );
    }

    const namedValues = await getNamedValues(
      leaf.namedArgParsers || {},
      namedArgs,
      leafStack,
    );

    let escapedValue: any;
    if (leaf.escapedArgParser) {
      escapedValue = await parseArgs(leaf.escapedArgParser, escapedArgs, '--', leafStack);
    } else if (escapedArgs) {
      throw new CliUsageError(
        `Command "${leaf.name}" does not allow "--" as an argument`,
      );
    }

    try {
      const result = await leaf.action(argsValue, namedValues, escapedValue);
      return result;
    } catch (exception) {
      if (exception && exception.code === CLI_USAGE_ERROR) {
        exception.commandStack = leafStack;
      }
      throw exception;
    }
  }
}
