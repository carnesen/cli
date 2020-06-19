import {
	CliCommand,
	CliStringArrayArgGroup,
	Cli,
	runCliAndExit,
} from '@carnesen/cli';

export const echo = CliCommand({
	name: 'echo',
	description: 'Write arguments to standard output (stdout)',
	positionalArgGroup: CliStringArrayArgGroup({
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
