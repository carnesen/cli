import {
	CliCommand,
	CliBranch,
	runCliAndExit,
} from '@carnesen/cli';
import { echo as echoCommand } from '../echo';

const hiddenEcho = CliCommand({
	...echoCommand,
	name: 'hidden-echo',
	description:
		'This command is a clone of "echo" but with "hidden" set to true',
	hidden: true,
});

export const root = CliBranch({
	name: 'cli',
	description: `
    Non-hidden command "${echoCommand.name}" shows up in this usage documentation.
    Hidden subcommand "${hiddenEcho.name}" does not appear in the children list.`,
	children: [hiddenEcho, echoCommand],
});

if (module === require.main) {
	runCliAndExit(root);
}
