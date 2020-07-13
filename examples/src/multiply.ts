// src/multiply.ts
import { Cli, CliCommand, CliNumberArrayArgGroup } from '@carnesen/cli';

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
