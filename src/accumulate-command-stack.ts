import { Command } from './types';
import { CLI_LEAF } from './constants';

export function accumulateCommandStack(
  command: Command,
  restCommandNamesAndPositionalArgs: string[],
): string[] {
  if (command.commandType === CLI_LEAF) {
    return restCommandNamesAndPositionalArgs;
  }

  const found = command.subcommands.find(
    (subcommand) => subcommand.name === restCommandNamesAndPositionalArgs[0],
  );

  if (!found) {
    // eslint-disable-next-line no-param-reassign
    command.next = undefined;
    return restCommandNamesAndPositionalArgs;
  }

  // eslint-disable-next-line no-param-reassign
  command.next = found;

  return accumulateCommandStack(found, restCommandNamesAndPositionalArgs.slice(1));
}
