#!/usr/bin/env node
import {
	CliCommand,
	CliStringArrayValuedParser,
	runCliAndExit,
} from '@carnesen/cli';

export const echo = CliCommand({
	name: 'echo',
	description:
		'Write arguments to standard output (stdout)',
	positionalParser: CliStringArrayValuedParser({
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
