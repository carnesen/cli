import {
	CliCommand,
	CliStringArrayValuedParser,
	Cli,
	runCliAndExit,
} from '@carnesen/cli';

export const echo = CliCommand({
	name: 'echo',
	description: 'Write arguments to standard output (stdout)',
	positionalParser: CliStringArrayValuedParser({
		required: true,
	}),
	action(messages) {
		const text = messages.join(' ');
		return text;
	},
});

// Exported for unit testing
export const cli = Cli(echo);

if (module === require.main) {
	runCliAndExit(cli);
}
