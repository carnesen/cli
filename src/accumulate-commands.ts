import { Command, Options } from './types';
import { usage } from './usage';

export function accumulateCommands(
  rootCommand: Command<Options>,
  maybeCommandNames: string[],
) {
  const commands = [rootCommand];
  for (const maybeCommandName of maybeCommandNames) {
    if (maybeCommandName === 'help') {
      throw usage(commands);
    }

    const currentCommand = commands.slice(-1)[0];
    if (!currentCommand.subcommands) {
      const errorMessage = `Command "${
        currentCommand.commandName
      }" does not have subcommands`;
      throw usage(commands, errorMessage);
    }

    const nextCommand = currentCommand.subcommands.find(
      subcommand => subcommand.commandName === maybeCommandName,
    );

    if (!nextCommand) {
      throw usage(commands, `Bad command "${maybeCommandName}"`);
    }

    commands.push(nextCommand);
  }
  return commands;
}
