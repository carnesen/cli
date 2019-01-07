import { Command, Options } from './types';
import { UsageError } from './util';

export function accumulateCommandStack(
  accumulator: Command<Options>[],
  maybeCommandNames: string[],
) {
  if (accumulator.length === 0) {
    throw new Error('Expected accumulator to contain at least one command');
  }
  for (const maybeCommandName of maybeCommandNames) {
    if (maybeCommandName === 'help') {
      throw new UsageError();
    }

    const currentCommand = accumulator.slice(-1)[0];
    if (!currentCommand.subcommands) {
      throw new UsageError(
        `Command "${currentCommand.commandName}" does not have subcommands`,
      );
    }

    const nextCommand = currentCommand.subcommands.find(
      subcommand => subcommand.commandName === maybeCommandName,
    );

    if (!nextCommand) {
      throw new UsageError(`Bad command "${maybeCommandName}"`);
    }

    accumulator.push(nextCommand);
  }
}
