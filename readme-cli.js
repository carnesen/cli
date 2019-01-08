// example-cli.js
const { option, leaf, branch, cli } = require('./lib');
const { promisify } = require('util');
const { readFile } = require('fs');
// ^^ In TypeScript replace "const ... require" with "import ... from".
// Other than that the remainder of this example is the same in TypeScript.

// A "leaf" command is one that defines options and an "action" function
const multiplyCommand = leaf({
  commandName: 'multiply',
  description: 'Multiply numbers',
  options: {
    numbers: option({
      typeName: 'number[]',
    }),
    squareTheResult: option({
      typeName: 'boolean',
    }),
  },
  action: ({ numbers, squareTheResult }) => {
    const multiplied = numbers.reduce((a, b) => a * b, 1);
    if (squareTheResult) {
      return multiplied * multiplied;
    }
    return multiplied;
  }
});

const readFileCommand = leaf({
  commandName: 'read-file',
  description: 'Read a file from disk',
  options: {
    filePath: option({
      typeName: 'string',
      description: 'An absolute or relative path',
      defaultValue: __filename,
    }),
  },
  action: async ({ filePath }) => {
    const contents = await promisify(readFile)(filePath, { encoding: 'utf8' });
    return contents;
  },
});

// A "branch" command is a container for subcommands which can
// themselves be either "branch" commands or "leaf" commands
const rootCommand = branch({
  commandName: 'readme-cli',
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.`,
  subcommands: [multiplyCommand, readFileCommand],
});

cli(rootCommand);
