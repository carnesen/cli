import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

/**
 * A CliCommand that prints to the terminal like the `echo` shell command
 */
export const echoCommand = CliCommand({
	name: 'echo',
	description: 'Prints the provided arguments to the terminal',
	positionalArgGroup: CliStringArrayArgGroup({
		required: true,
	}),
	action({ positionalValue: messages }) {
		const text = messages.join(' ');
		return text;
	},
});
