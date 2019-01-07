import { createOption, createCommand } from './util';
import { cli } from './cli';

const messageOption = createOption({
  typeName: 'string',
  description: 'a message',
});

const printCommand = createCommand({
  commandName: 'print',
  description: 'Print a message to the console',
  options: {
    message: messageOption,
  },
  async execute({ message }) {
    return message;
  },
});

const throwCommand = createCommand({
  commandName: 'throw',
  description: 'Throw a message to the console',
  options: {
    message: messageOption,
    includeStack: createOption({
      typeName: 'boolean',
      description: 'Include a stack trace',
      defaultValue: false,
    }),
  },
  async execute({ message, includeStack }) {
    if (includeStack) {
      throw new Error(message);
    }
    throw message;
  },
});

const math = createCommand({
  commandName: 'math',
  description: 'Do mathematical operations',
  options: {},
  subcommands: [
    createCommand({
      commandName: 'sum',
      description: 'Add numbers',
      options: {
        numbers: createOption({
          typeName: 'number[]',
          description: 'The numbers to sum',
        }),
      },
      async execute({ numbers }) {
        return numbers.reduce((a, b) => a + b, 0);
      },
    }),
  ],
});

const rootCommand = createCommand({
  commandName: 'example-cli',
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.`,
  options: {},
  subcommands: [math, printCommand, throwCommand],
});

cli(rootCommand);
