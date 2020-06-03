# @carnesen/cli [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://badge.fury.io/js/%40carnesen%2Fcli) [![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster)

A framework for building command-line interfaces (CLIs) in Node.js. This package includes runtime JavaScript files suitable for Node.js >=10 as well as the corresponding TypeScript type declarations.

API Documentation: [https://cli.carnesen.com/](https://cli.carnesen.com/)

## Usage

```
npm install @carnesen/cli
```

Here is a CLI that does some basic arithmetic:

```typescript
// readme.ts
import {
  CliCommand,
  CliNumberArrayArgParser,
  runCliAndExit
} from '@carnesen/cli';

export const multiply = CliCommand({
  name: 'multiply',
  description: 'Multiply numbers and print the result',
  positionalArgParser: CliNumberArrayArgParser({ required: true }),
  action(numbers) {
    return numbers.reduce((a, b) => a * b, 1);
  },
});

if (require.main === module) {
  runCliAndExit(multiply);
}
```
Here's how that behaves as a CLI.

![command-line usage ](media/readme-usage.gif)

Check out [src/examples](src/examples) for more!
## Structure
The general structure of a `@carnesen/cli` is:
```
<branch> <command> <positional-args> --name <named-args> -- <escaped-args>
```
Everything after `<program>` is optional.

## More information
If you encounter any bugs, questions, or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related
- [@carnesen/run-and-exit](https://github.com/carnesen/run-and-exit): Run a function, `console.log` the result, and `process.exit`
- [@carnesen/coded-error](https://github.com/carnesen/coded-error): An enhanced `Error` class with additional properties "code" and "data"
- [@carnesen/eslint-config](https://github.com/carnesen/eslint-config): ESLint configurations for `@carnesen` projects
- [@carnesen/tsconfig](https://github.com/carnesen/tsconfig): TypeScript configurations for `@carnesen` projects

## License
MIT © [Chris Arnesen](https://www.carnesen.com)
