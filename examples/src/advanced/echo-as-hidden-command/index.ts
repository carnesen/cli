import {
	CliCommand,
	CliBranch,
	runCliAndExit,
	Cli,
	CliStringArrayArgGroup,
} from '@carnesen/cli';
import { echo as echoCommand } from '../../echo';

export const ECHO_AS_HIDDEN_COMMAND = 'echo-as-hidden-command';

export const echoAsHiddenCommand = CliCommand({
	name: ECHO_AS_HIDDEN_COMMAND,
	description:
		'This command is a clone of "echo" but with "hidden" set to true',
	hidden: true,
	positionalArgGroup: CliStringArrayArgGroup({
		required: true,
	}),
	action(messages) {
		return messages.join(' ');
	},
});

// This is just a dummy branch to be able to illustrate hidden commands
const branch = CliBranch({
	name: 'branch',
	description: `
		Non-hidden command "${echoCommand.name}" shows up in this usage documentation.
		
		Hidden subcommand "${echoAsHiddenCommand.name}" does not appear in the children list.`,
	children: [echoAsHiddenCommand, echoCommand],
});

// Exported for unit testing
export const cli = Cli(branch);

// So that we can run this module as a standalone CLI
if (module === require.main) {
	runCliAndExit(cli);
}
