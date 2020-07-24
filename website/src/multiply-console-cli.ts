// src/cli.ts
import { Cli, CliCommand, CliNumberArrayArgGroup } from '@carnesen/cli';

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

// Attach the `multiply` CLI's `runLine` method to the global JavaScript context
(window as any).multiply = (line: string) => cli.runLine(line);
