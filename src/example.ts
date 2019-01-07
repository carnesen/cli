import { option, command, cli } from '.';

const messageOption = option({
  typeName: 'string',
  description: 'a message',
});

const echoCommand = command({
  commandName: 'echo',
  description: 'Print a message to the console',
  options: {
    message: messageOption,
    appendBar: option({
      description: 'Append "foo" to the message',
      typeName: 'boolean',
    }),
  },
  async action({ message, appendBar }) {
    return appendBar ? `${message}bar` : message;
  },
});

const throwCommand = command({
  commandName: 'throw',
  description: 'Throw a message to the console',
  options: {
    message: messageOption,
    includeStack: option({
      typeName: 'boolean',
      description: 'Include a stack trace',
      defaultValue: false,
    }),
  },
  async action({ message, includeStack }) {
    if (includeStack) {
      throw new Error(message);
    }
    throw message;
  },
});

const mathOptions = {
  numbers: option({
    typeName: 'number[]',
    description: 'The numbers to sum',
  }),
};

const concatCommand = command({
  commandName: 'concat',
  options: {
    strings: option({
      typeName: 'string[]',
      description: 'Strings to concat',
    }),
  },
  async action({ strings }) {
    return strings.reduce((a, b) => a + b, '');
  },
});

const mathCommand = command({
  commandName: 'math',
  description: 'Do mathematical operations',
  subcommands: [
    command({
      commandName: 'multiply',
      description: 'Multiply numbers',
      options: mathOptions,
      async action({ numbers }) {
        return numbers.reduce((a, b) => a * b, 1);
      },
    }),
    command({
      commandName: 'square',
      description: 'Square a number',
      options: {
        number: option({
          description: 'A number to square',
          typeName: 'number',
        }),
      },
      async action({ number }) {
        return number * number;
      },
    }),
  ],
});

export const rootCommand = command({
  commandName: 'example-cli',
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.`,
  subcommands: [mathCommand, concatCommand, echoCommand, throwCommand],
});

if (module === require.main) {
  cli(rootCommand);
}
