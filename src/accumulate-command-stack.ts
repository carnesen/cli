import { Command } from './types';
import { CLI_LEAF } from './constants';

export function accumulateCommandStack(
  command: Command,
  restCommandNamesAndPositionalArgv: string[],
): string[] {
  if (command.commandType === CLI_LEAF) {
    return restCommandNamesAndPositionalArgv;
  }

  const found = command.subcommands.find(
    (subcommand) => subcommand.name === restCommandNamesAndPositionalArgv[0],
  );

  if (!found) {
    // eslint-disable-next-line no-param-reassign
    command.next = undefined;
    return restCommandNamesAndPositionalArgv;
  }

  // eslint-disable-next-line no-param-reassign
  command.next = found;

  return accumulateCommandStack(found, restCommandNamesAndPositionalArgv.slice(1));
}
