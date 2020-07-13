Command-line interfaces for Node.js and the browser

[![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/cli) [![github stars badge](https://img.shields.io/github/stars/carnesen/cli)](https://github.com/carnesen/cli)

The `carnesen/cli` package includes:
- Runtime JavaScript files (ES2019 + CommonJS)
- TypeScript type declarations (3.7+)
- HTML API documentation

This library has _no_ dependencies and is known to work with Node.js 10+ and all modern web browsers. For more information please check out our:
- [Interactive examples](https://cli.carnesen.com/)
- [Online documentation](https://cli.carnesen.com/docs)
- [Repository on GitHub](https://github.com/carnesen/cli)
- [Example project](https://github.com/carnesen/cli/tree/master/examples)

### Usage
Install this library using `npm`:

```
npm install @carnesen/cli
```

Here is a TypeScript Node.js CLI that does some basic arithmetic:

```typescript
// src/multiply.ts
import {
   Cli,
   CliCommand,
   CliNumberArrayArgGroup,
} from '@carnesen/cli';

const multiplyCommand = CliCommand({
   name: 'multiply',
   description: 'Multiply numbers and print the result',
   positionalArgGroup: CliNumberArrayArgGroup({
      required: true,
   }),
   action(numbers) {
      return numbers.reduce((a, b) => a * b, 1);
   },
});

// Export for unit testing
export const cli = Cli(multiplyCommand);

// If this module is the entrypoint for this Node.js process
if (require.main === module) {
   cli.run();
}
```

Here's how that Node.js CLI behaves in a terminal:
<p><img width="400" src="images/multiply-nodejs.jpg" alt="Multiple CLI in Node.js"></p>

The only Node.js-specific code is the `if (require.main === module)` block. To instead make a web browser console CLI, replace that with:

```typescript
(window as any).multiply = (line: string) => {
	cli.runLine(line);
};
```

Here's how that behaves as a web browser console CLI:
<p><img width="400" src="images/multiply-browser-console.jpg" alt="Multiple CLI in browser console"></p>

Like an exit code in a shell, the resolved value of `0` means the command finished successfully. Anything else e.g. `1` is an error code. Try it you yourself at [cli.carnesen.com](https://cli.carnesen.com). (How to open the console in [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Google Chrome](https://stackoverflow.com/a/66434/2793540))

### Features
All components of `@carnesen/cli` are intelligently typed e.g. `action`'s `numbers` argument has type `number[]`.

### Core concepts
The general structure of a `@carnesen/cli` is:
```
<branch> <command> <positional-args> --name <named-args> -- <escaped-args>
```
Only `<command>` is required.

### Stability
This library has 99% test coverage and heavy usage by its author but should be considered 0.x beta software.

### More information
If you have questions, encounter bugs, or would like to request a feature, please don't hesitate to [file an issue](https://github.com/carnesen/cli/issues/new) or [submit a pull request](https://github.com/carnesen/cli/compare) on [this project's repository on GitHub](https://github.com/carnesen/cli).

### License
MIT © [Chris Arnesen](https://www.carnesen.com)
