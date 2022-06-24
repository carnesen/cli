// src/multiply.ts
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

// If this module is the entrypoint for this Node.js process
if (require.main === module) {
	cli.run();
}
