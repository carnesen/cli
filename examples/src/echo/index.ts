#!/usr/bin/env node
import {
	CliCommand,
	CliStringArrayArgParser,
	runCliAndExit,
} from '@carnesen/cli';

export const echo = CliCommand({
	name: 'echo',
	description:
		'Write arguments to standard output (stdout)',
	positionalArgParser: CliStringArrayArgParser({
		required: true,
	}),
	action(messages) {
		const text = messages.join(' ');
		return text;
	},
});

if (module === require.main) {
	runCliAndExit(echo);
}
