import { CliNode, CliCommandNode } from './cli-node';
import { CliUsageError } from './cli-usage-error';
import { CLI_COMMAND } from './cli-command';
import { CLI_BRANCH } from './cli-branch';

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
 * @param current - A CliCommand of
 * @param args - An array of string command-line arguments
 * @returns A [[`CliCommandNode`]] and the remaining unprocessed command-line args
 *
 * @hidden
 */

export function navigateToCommand(
  current: CliNode['current'],
  args: string[],
): [CliCommandNode, string[]] {
  return recursiveNavigateToCommand({ current, parents: [] }, args);
}

export function recursiveNavigateToCommand(
  node: CliNode,
  args: string[],
): [CliCommandNode, string[]] {
  const { current, parents } = node;

  // Terminate recursion if current is a command
  if (current.kind === CLI_COMMAND) {
    return [{ current, parents }, args];
  }

  if (current.kind === CLI_BRANCH) {
    if (args.length === 0) {
      // Example: Full command is "cli user login". They've done "cli user". In this case we
      // want to print the usage string but not an error message.
      throw new CliUsageError(undefined, node);
    }

    if (args[0] === '--help') {
      throw new CliUsageError(undefined, node);
    }

    const next = current.children.find((subcommand) => subcommand.name === args[0]);

    if (!next) {
      // Example: Full command is "cli user login". They've done "cli login".
      throw new CliUsageError(`Bad command "${args[0]}"`, node);
    }

    return recursiveNavigateToCommand(
      {
        parents: [...parents, current],
        current: next,
      },
      args.slice(1),
    );
  }

  throw new Error('Unexpected kind');
}
