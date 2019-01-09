import { promisify } from 'util';
import { option, leaf, cli, branch } from '.';
import { readFile } from 'fs';

const messageOptions = {
  message: option({
    typeName: 'string',
    description: 'a message',
  }),
};

const echoCommand = leaf({
  commandName: 'echo',
  description: 'Print a message to the console',
  options: {
    ...messageOptions,
    appendBar: option({
      description: 'Append "foo" to the message',
      typeName: 'boolean',
    }),
  },
  action({ message, appendBar }) {
    return appendBar ? `${message}bar` : message;
  },
});

const throwCommand = leaf({
  commandName: 'throw',
  description: 'Throw a message to the console',
  options: {
    ...messageOptions,
    includeStack: option({
      typeName: 'boolean',
      description: 'Include a stack trace',
      defaultValue: false,
    }),
  },
  action({ message, includeStack }) {
    if (includeStack) {
      throw new Error(message);
    }
    throw message;
  },
});

const mathOptions = {
  numbers: option({
    typeName: 'number[]',
  }),
};

const concatCommand = leaf({
  commandName: 'concat',
  options: {
    strings: option({
      typeName: 'string[]',
      description: 'Strings to concat',
    }),
  },
  action({ strings }) {
    return strings.reduce((a, b) => a + b, '');
  },
});

const mathBranch = branch({
  commandName: 'math',
  description: 'Do mathematical operations',
  subcommands: [
    leaf({
      commandName: 'multiply',
      description: 'Multiply numbers',
      options: mathOptions,
      action({ numbers }) {
        return numbers.reduce((a, b) => a * b, 1);
      },
    }),
    leaf({
      commandName: 'square',
      description: 'Square a number',
      options: {
        number: option({
          description: 'A number to square',
          typeName: 'number',
        }),
      },
      action({ number }) {
        return number * number;
      },
    }),
  ],
});

const readFileCommand = leaf({
  commandName: 'cat',
  description: "Print a file's contents",
  options: {
    path: option({
      typeName: 'string',
      description: 'An absolute or relative path',
      defaultValue: __filename,
    }),
  },
  action: async ({ path }) => {
    const contents = await promisify(readFile)(path, { encoding: 'utf8' });
    return contents;
  },
});

export const rootCommand = branch({
  commandName: 'example-cli',
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.`,
  subcommands: [readFileCommand, mathBranch, concatCommand, echoCommand, throwCommand],
});

if (module === require.main) {
  cli(rootCommand);
}
