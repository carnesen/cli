// readme-cli.js
const { option, leaf, branch, cli } = require('./lib');
const { promisify } = require('util');
const { readFile } = require('fs');
const { isAbsolute } = require('path');
// ^^ In TypeScript replace "const ... require" with "import ... from".
// Other than that the remainder of this example is the same in TypeScript.

// A "leaf" command defines an "action" function
const multiply = leaf({
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
  action({ numbers, squareTheResult }) {
    const multiplied = numbers.reduce((a, b) => a * b, 1);
    if (squareTheResult) {
      return multiplied * multiplied;
    }
    return multiplied;
  }
});

const cat = leaf({
  commandName: 'cat',
  description: 'Print the contents of a file',
  options: {
    filePath: option({
      typeName: 'string',
      description: 'An absolute path',
      defaultValue: __filename,
      validate(value) {
        if (isAbsolute(value)) {
          return;
        }
        return 'File path must be absolute'
      }
    }),
  },
  async action({ filePath }) {
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
  subcommands: [multiply, cat],
});

if (require.main === module) {
  cli(rootCommand);
}

module.exports = rootCommand;
