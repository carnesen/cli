/** src/multiply-command.ts */
import { c } from '@carnesen/cli';

/** A command for multiplying numbers, the one and only command for this CLI,
 * exported for unit testing */
export const multiplyCommand = c.command({
	name: 'multiply',
	description: 'Multiply numbers and print the result',
	positionalArgGroup: c.numberArray(),
	action({ positionalValue: numbers }) {
		return numbers.reduce((a, b) => a * b, 1);
	},
});

if (require.main === module) {
	// This module is the entrypoint for this Node.js process
	const cli = c.cli(multiplyCommand);
	cli.run();
}
