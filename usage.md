## Usage
Install this library using `npm`:

```plaintext
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
   action({ positionalValue: numbers }) {
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

Like an exit code in a shell, the resolved value of `0` means the command finished successfully. Anything else is an error code. Try it you yourself at [cli.carnesen.com](https://cli.carnesen.com)! Here's how to open the console in [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Google Chrome](https://stackoverflow.com/a/66434/2793540).
