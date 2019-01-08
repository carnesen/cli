# @carnesen/cli [![Build Status](https://travis-ci.org/carnesen/cli.svg?branch=master)](https://travis-ci.org/carnesen/cli)

A library for writing Node.js command-line interfaces (CLIs)

## Install

```
$ npm install @carnesen/cli
```

This package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

```js
// readme-cli.js
const { option, leaf, branch, cli } = require('@carnesen/cli');
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
```

Here's how that behaves as a CLI. If no arguments are passed, it prints the top-level usage:
```
$ readme-cli
Usage: readme-cli <subcommand> <options>

   This is an example command-line interface (CLI).
   Its only purpose is to demonstrate features.

Subcommands:

   multiply, read-file
```
The usage of an `@carnesen/cli` CLI is always `<program> [<subcommand0> ...] [--option-name <val0> ...]`. The CLI arguments up to the first one starting with `--` are command/subcommand names. Starting with the first `--` argument, all remaining arguments are either option names or option values.

If a subcommand is invoked without its required arguments, the CLI prints usage for the subcommand:
```
$ readme-cli multiply
Error: option "numbers" is required

Usage: readme-cli multiply <options>

   Multiply numbers

Options:

   --numbers <num0> [<num1> ...]
```
Here is an examples of successful invocation of a command with a synchronous "action":
```
$ readme-cli multiply --numbers 1 2 3 4
24
```
And a command with an asynchronous "action":
```
$ readme-cli read-file --file-path readme-cli.js
// readme-cli.js
const { option, command, cli } = require('@carnesen/cli');
...
```
From this last example we can see that [kebab-cased](https://en.wikipedia.org/wiki/Kebab_case) command-line "option" arguments are converted to [camelCased](https://en.wikipedia.org/wiki/Camel_case) property names before being passed into the "action" function. The command line "subcommand" arguments however are left as-is.

## API

### option({typeName, description, defaultValue})
A factory function for creating "option" arguments for a CLI. Returns the passed object. In a JavaScript application, strictly speaking the `option` factory isn't necessary since the compiled .js code is just `const option = opt => opt`. It's still highly recommended though for readability and also because it may become be required in a future version of this library.

#### typeName
One of `'string' | 'string[]' | 'boolean' | 'number' | 'number[]'`

#### description
(Optional) A string that will be included in the `Usage:` output if present.
#### defaultValue
(Optional) A value consistent with `typeName`. For example, TypeScript would complain if you tried to do this:
```ts
// NOT OK
const notOkOption = option({
  typeName: 'number',
  defaultValue: 'foo',
  // ^^ Type 'string' is not assignable to type 'number | undefined'
})
```

### leaf({commandName, description, options, action})
Similar to `option`, `leaf` is a factory function for creating commands that comprise a CLI. It returns the passed object with an additional property "commandType" set to a unique identifier. The "commandType" property is used internally to discriminate between "leaf" and "branch" commands. See the [advanced TypeScript docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html) for more information on "discriminated unions".
#### commandName
If this leaf is a subcommand, "commandName" is the string that the user will pass as the "subcommand" argument to invoke this action. If this leaf is the root command, "commandName" should be the CLI's name. It's recommended that `commandName` be [kebab-cased](https://en.wikipedia.org/wiki/Kebab_case), but no such restriction is imposed.

#### description
(Optional) A string that will be included in the `Usage:` output if present.

#### options 
(Optional) An object whose keys are [camelCased](https://en.wikipedia.org/wiki/Camel_case) option names and whose values are created by the `option` factory, for example:
```ts
const options = {
  filePath: option({
    typeName: 'string',
    description: 'An absolute or relative path',
  }),
}
```
The `options` property is used to derive the type of `namedArgs` passed to the `action` function. In this example, `NamedArgs<O>` would look like
```ts
{ filePath: string }
```

#### action
A function that defines your command logic. `action` can return a value synchronously like in the "multiply" example above, or it can be an `async` function that returns a `Promise` like in the "read-file" example. If `action` returns a (resolved) value, that value is `console.log`ged before the CLI `process.exit(0)`'s. If `action` throws (rejects), the exception is `console.log`ged before the CLI `process.exit(1)`'s. That means that if you don't want the user to see a stack trace, your `action` should throw a `string` instead of an `Error` object.

### branch({commandName, description, subcommands})
A factory function similar to `leaf`. Returns the passed object with an additional property "commandType" set to a unique identifier for "branch" commands.

#### commandName
If this "branch" is a subcommand, "commandName" is the string that the user will pass as the "subcommand" argument to invoke actions in this part of the command tree. If this "branch" command is the root command, "commandName" should be the CLI's name.

#### description
(Optional) A string that will be included in the `Usage:` output if present.

#### subcommands
An array of `branch` and/or `leaf` objects.

### cli(rootCommand, argv)
Invokes an `action` indicated by command-line args `argv`, `console.log`'s the returned value or exception,and exits.

#### rootCommand
A `leaf` or `branch`.

#### argv
(Optional) A `string[]` array of command-line arguments. Defaults to `process.argv.slice(2)`.

### assembleCli(command)
The body of the `cli` function described above is a single statement:
```ts
runAndExit(assembleCli(rootCommand), argv);
```
`assembleCli` is exported separately because it's much easier to unit test the `async` function that it returns than it is to unit test the `runAndExit`-wrapped `cli`. See [src/__tests__/cli.test.ts](src/__tests__/cli.test.ts) for an example of how to unit test a `@carnesen/cli` CLI.

## More information
This library has a couple dozen unit tests with >98% coverage. If you want to see more examples of how it works, [the tests](src/__tests__) would be a good place to start. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related
- [@carnesen/run-and-exit](https://github.com/carnesen/run-and-exit): Run an async function, `console.log` the resolved/rejected value, and `process.exit`
- [@carnesen/coded-error](https://github.com/carnesen/coded-error): An enhanced `Error` class with additional properties "code" and "data"
