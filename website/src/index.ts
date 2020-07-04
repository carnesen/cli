import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { carnesenCliExamplesBranch } from '@carnesen/cli-examples';
import { CliRepl } from './cli-pseudo-shell';
import { bold } from './util';

import 'xterm/css/xterm.css';
import { showCommand } from './show-command';
import { docsCommand } from './docs-command';

async function loadTerminalApplication() {
	await (document as any).fonts.load('12px MonoLisa');

	const terminalOptions: ITerminalOptions = {
		fontFamily: 'MonoLisa',
	};

	const terminal = new Terminal(terminalOptions) as any;

	const fitAddon = new FitAddon();
	terminal.loadAddon(fitAddon);

	const webLinksAddon = new WebLinksAddon();
	terminal.loadAddon(webLinksAddon);

	const element = document.getElementById('terminal-container');
	if (!element) {
		throw new Error('Expected to find DOM element "terminal-container"');
	}
	element.style.width = '80%';
	element.style.margin = 'auto';
	// element.style.height = '450px';
	terminal.open(element);
	fitAddon.fit();
	const pseudoShell = new CliRepl({
		history: [
			'advanced',
			'show show',
			'throw-error --message Foo',
			'multiply 2 3 4',
			'echo foo bar baz',
			'history',
			'',
		],
		description: `
		This is a special terminal that runs ${bold(
			'@carnesen/cli',
		)} examples in your browser.

		Up and down arrows navigate command history. Tab auto-completes.`,
		subcommands: [
			docsCommand,
			...carnesenCliExamplesBranch.subcommands,
			showCommand,
		],
		terminal,
	});

	pseudoShell.start();
}

loadTerminalApplication().catch((exception) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(exception); // eslint-disable-line no-console
	}
});
