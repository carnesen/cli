# carnesen/cli [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/cli) [![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster)

`@carnesen/cli` is a TypeScript-first framework for building command-line interfaces (CLIs) in Node.js. The package includes runtime JavaScript files suitable for Node.js >=10 as well as the corresponding TypeScript type declarations.

- API docs: [https://cli.carnesen.com/](https://cli.carnesen.com/).
- Examples: [examples/src](examples/src)

## Usage

```
npm install @carnesen/cli
```

Here is [a CLI](examples/src/multiply/index.ts) that does some basic arithmetic:

```typescript
// examples/src/multiply/index.ts
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

![screen recording of "multiply" CLI](examples/src/multiply/demo.gif)

Check out [examples/src](examples/src) for more examples.
## Structure
The general structure of a `@carnesen/cli` is:
```
[<branch>] <command> <positional-args> --name <named-args> -- <escaped-args>
```
`[branch]` and everything after `<command>` are optional features.

## More information
If you encounter any bugs, questions, or feature requests, please don't hesitate to file an issue or submit a pull request on [this project's repository on GitHub](https://github.com/carnesen/cli).

## License
MIT © [Chris Arnesen](https://www.carnesen.com)
