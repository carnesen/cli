import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { carnesenCliExamplesBranch } from '@carnesen/cli-examples';
import { CliRepl } from './cli-repl';
import { bold } from './util';

import 'xterm/css/xterm.css';
import { showCommand } from './show-command';
import { docsCommand } from './docs-command';

async function loadTerminalApplication() {
	// Wait for web fonts to work around
	// https://github.com/xtermjs/xterm.js/issues/1164
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
	terminal.open(element);
	fitAddon.fit();

	const urlParams = new URLSearchParams(window.location.search);
	let line = '';
	const lineParam = urlParams.get('line');
	if (lineParam) {
		const indexOfNewline = lineParam.indexOf('\n');
		if (indexOfNewline >= 0) {
			line = lineParam.substring(0, indexOfNewline);
		} else {
			line = lineParam;
		}
	}

	const submitParam = urlParams.get('submit');
	const submit = submitParam === 'true';

	const pseudoShell = new CliRepl({
		history: [
			'advanced',
			'show show',
			'throw-error --message Foo',
			'multiply 2 3 4',
			'echo foo bar baz',
			'history',
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
		line,
		submit,
	});

	pseudoShell.start();
}

loadTerminalApplication().catch((exception) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(exception); // eslint-disable-line no-console
	}
});
