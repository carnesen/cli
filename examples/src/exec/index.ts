#!/usr/bin/env node
import { execSync } from 'child_process';
import {
	CliCommand,
	CliStringArrayValuedParser,
	runCliAndExit,
} from '@carnesen/cli';

export const exec = CliCommand({
	name: 'exec',
	description: 'Run a shell command',
	escapedParser: CliStringArrayValuedParser({
		required: true,
		placeholder: '<command> [<arguments>]',
	}),
	action(_, __, escaped) {
		const command = escaped.join(' ');
		const output = execSync(command, {
			encoding: 'utf8',
		});
		return output;
	},
});

if (module === require.main) {
	runCliAndExit(exec);
}
