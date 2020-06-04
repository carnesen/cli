import { Node, Leaf, BranchOrCommand } from './cli-node';
import { CLI_COMMAND } from './constants';
import { CliUsageError } from './cli-usage-error';

/**
 * Navigate a tree of commands to find a command
 *
 * @remarks
 * This function uses recursion to construct a linked list of commands. For example,
 * suppose the full command-line is:
 * ```
 * $ cloud-cli user login --username carnesen
 * ```
 * The root command is a branch with a subcommand "user", which in turn has a subcommand
 * "login", a command.
 *
 * The recursion terminates when a command is reached
 * @param command - A CliCommand of
 * @param args - An array of string command-line arguments
 * @returns A Command Stack and the remaining unprocessed command-line args
 *
 * @hidden
 */

export function navigateToCommand(
  command: BranchOrCommand,
  args: string[],
): [Leaf, string[]] {
  return recursiveNavigateToCommand({ current: command, parents: [] }, args);
}

export function recursiveNavigateToCommand(
  locationInCommandTree: Node,
  args: string[],
): [Leaf, string[]] {
  const { current, parents } = locationInCommandTree;
  // Terminate recursion if current is a command
  if (current.commandType === CLI_COMMAND) {
    return [{ current, parents }, args];
  }

  // current is a branch
  if (args.length === 0) {
    // Example: Full command is "cli user login". They've done "cli user". In this case we
    // want to print the usage string but not an error message.
    throw new CliUsageError(undefined, locationInCommandTree);
  }

  if (args[0] === '--help') {
    throw new CliUsageError(undefined, locationInCommandTree);
  }

  const next = current.children.find((subcommand) => subcommand.name === args[0]);

  if (!next) {
    // Example: Full command is "cli user login". They've done "cli login".
    throw new CliUsageError(`Bad command "${args[0]}"`, locationInCommandTree);
  }

  return recursiveNavigateToCommand(
    {
      parents: [...parents, current],
      current: next,
    },
    args.slice(1),
  );
}
