# @carnesen/cli [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://badge.fury.io/js/%40carnesen%2Fcli) [![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster)

A framework for building command-line interfaces (CLIs) in Node.js. This package includes runtime JavaScript files suitable for Node.js >=10 as well as the corresponding TypeScript type declarations.

## Usage

```
npm install @carnesen/cli
```

Here is a CLI that does some basic arithmetic:
```ts
// readme.ts
import {
  CliCommand,
  CliNumberArrayArgParser,
  runCliAndExit,
} from '@carnesen/cli';

export const root = CliCommand({
  name: 'multiply',
  description: 'Multiply numbers and print the result',
  positionalArgParser: CliNumberArrayArgParser({ required: true }),
  action(args) {
    return args.reduce((a, b) => a * b, 1);
  },
});

if (require.main === module) {
  runCliAndExit(root);
}
```

Here's how that behaves as a CLI.
![Usage: multiply <num0> ... Multiply numbers and print the result Error: <num0> ... : argument is required](media/readme-usage.jpg)
With arguments:
```
$ ts-node readme.ts 1 2 3
6
```

## Structure
The general structure of a `@carnesen/cli` is:
```
<branch> <command> <positional-args> --name <named-args> -- <escaped-args>
```
Everything after `<program>` is optional.

## More information
This library has a couple dozen unit tests with >95% coverage. If you want to see more examples of how things works, check out the `.test.ts` files in the [src](src) directory. Also check out [src/examples](src/examples). If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related
- [@carnesen/run-and-exit](https://github.com/carnesen/run-and-exit): Run a function, `console.log` the result, and `process.exit`
- [@carnesen/coded-error](https://github.com/carnesen/coded-error): An enhanced `Error` class with additional properties "code" and "data"
- [@carnesen/eslint-config](https://github.com/carnesen/eslint-config): ESLint configurations for `@carnesen` projects
- [@carnesen/tsconfig](https://github.com/carnesen/tsconfig): TypeScript configurations for `@carnesen` projects

## License
MIT © [Chris Arnesen](https://www.carnesen.com)
