#!/usr/bin/env node
import {
	CliCommand,
	CliNumberArrayValuedParser,
	runCliAndExit,
} from '@carnesen/cli';

export const multiply = CliCommand({
	name: 'multiply',
	description: 'Multiply numbers and print the result',
	positionalParser: CliNumberArrayValuedParser({
		required: true,
	}),
	action(numbers) {
		return numbers.reduce((a, b) => a * b, 1);
	},
});

if (require.main === module) {
	runCliAndExit(multiply);
}
