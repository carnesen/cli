// src/cli.ts
import { c } from '@carnesen/cli';

const multiplyCommand = c.command({
	name: 'multiply',
	description: 'Multiply numbers and print the result',
	positionalArgGroup: c.numberArray(),
	action({ positionalValue: numbers }) {
		return numbers.reduce((a, b) => a * b, 1);
	},
});

// Export for unit testing
export const cli = c.cli(multiplyCommand);

// Attach the `multiply` CLI's `runLine` method to the global JavaScript context
(window as any).multiply = (line: string) => cli.runLine(line);
