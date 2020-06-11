import {
	CliCommand,
	CliNumberArrayValuedParser,
	runCliAndExit,
	Cli,
} from '@carnesen/cli';

/** Exported because this command is also a child of the main branch in ../ */
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

/** Exported for unit testing */
export const cli = Cli(multiply);

/** So that we can run this module as a standalone CLI too */
if (require.main === module) {
	runCliAndExit(cli);
}
