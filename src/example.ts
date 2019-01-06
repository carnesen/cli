import { createOption, createCommand } from './util';
import { runCommand } from './run-command';

const messageOption = createOption({
  typeName: 'string',
  description: 'a message',
});

const printCommand = createCommand({
  commandName: 'print',
  description: 'Print the provided message to the console',
  options: {
    message: messageOption,
  },
  async execute(namedArg) {
    return namedArg.message;
  },
});

const rootCommand = createCommand({
  commandName: 'example-cli',
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.`,
  options: {},
  subcommands: [printCommand],
});

runCommand(printCommand);
