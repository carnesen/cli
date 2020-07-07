import { Cli, runCli } from '@carnesen/cli';

import { rootCommand } from './root-command';
import { CommandLine } from './command-line';

// Define `cli` in the browser's global JavaScript context
(window as any).cli = function cli(line: string) {
	const commandLine = new CommandLine(line);
	const { args, doubleQuoted, singleQuoted } = commandLine.splitIntoArgs();
	if (doubleQuoted || singleQuoted) {
		throw new Error(
			`Your ${doubleQuoted ? 'double' : 'single'} quotes are not balanced`,
		);
	}
	runCli(Cli(rootCommand), {
		args,
		colors: false,
	});
};
