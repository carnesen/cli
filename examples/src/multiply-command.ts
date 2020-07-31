import { CliCommand, CliNumberArrayArgGroup } from '@carnesen/cli';

/**
 * A CliCommand for multiplying numbers
 */
export const multiplyCommand = CliCommand({
	name: 'multiply',
	description: 'Multiply numbers and print the result',
	positionalArgGroup: CliNumberArrayArgGroup({
		required: true,
	}),
	action({ positionalValue: numbers }) {
		return numbers.reduce((a, b) => a * b, 1);
	},
});
