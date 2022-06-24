import { c } from '@carnesen/cli';

/**
 * A CliCommand for multiplying numbers
 */
export const multiplyCommand = c.command({
	name: 'multiply',
	description: 'Multiply numbers and print the result',
	positionalArgGroup: c.numberArray(),
	action({ positionalValue: numbers }) {
		return numbers.reduce((a, b) => a * b, 1);
	},
});
