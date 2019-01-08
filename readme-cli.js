// example-cli.js
const { option, leaf, branch, cli } = require('./lib');
const { promisify } = require('util');
const { readFile } = require('fs');
// ^^ In TypeScript replace "const ... require" with "import ... from".
// Other than that the remainder of this example is the same in TypeScript.

const multiplyCommand = leaf({
  commandName: 'multiply',
  description: 'Multiply numbers',
  options: {
    numbers: option({
      typeName: 'number[]',
    }),
  },
  action: ({ numbers }) => numbers.reduce((a, b) => a * b, 1),
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

const rootCommand = branch({
  commandName: 'example-cli',
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.`,
  subcommands: [multiplyCommand, readFileCommand],
});

cli(rootCommand);
