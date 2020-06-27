import { Terminal } from 'xterm';
import {
	runCliAndExit,
	IRunCliAndExitOptions,
	Cli,
	ICliBranch,
	ICliCommand,
	CliBranch,
} from '@carnesen/cli';

import { CommandLineHistory } from './command-line-history';
import { green, yellow, splitWords, bold } from './util';
import { HistoryCommand } from './history-command';
import { autocomplete } from './autocomplete';

const INDENTATION = '    ';

export interface ICliReplOptions {
	/** A short description of this branch for command-line usage */
	description?: string;

	/** [[`ICliBranch`]] and/or [[`ICliCommand`]]s underneath this branch */
	subcommands: (ICliBranch | ICliCommand<any, any, any>)[];
	terminal: Terminal;
	history?: string[];
}

type KeyEvent = { key: string; domEvent: KeyboardEvent };

const PS1 = `${green('$')} `;

export class CliRepl {
	private readonly terminal: Terminal;

	private runningCommand = false;

	private settingCurrentLine = false;

	private readonly commandLineHistory: CommandLineHistory;

	private line = '';

	private index = 0;

	private readonly root: ICliBranch;

	public constructor({
		description,
		subcommands,
		terminal,
		history,
	}: ICliReplOptions) {
		this.terminal = terminal;
		this.commandLineHistory = new CommandLineHistory(history);
		this.line = this.commandLineHistory.current();
		const builtInCommands = [HistoryCommand(this.commandLineHistory)];
		this.root = CliBranch({
			description,
			name: '',
			subcommands: [...subcommands, ...builtInCommands],
		});
	}

	public start(): void {
		this.terminal.onKey((event) => {
			this.handleKeyEvent(event);
		});

		this.terminal.focus();
		this.consoleLog(`Hit ${bold('"Enter"')} to get started.`);
		this.prompt();
	}

	private prompt() {
		this.terminal.write(`\r\n${PS1}`);
	}

	private handleKeyEvent({ key, domEvent }: KeyEvent): void {
		if (this.settingCurrentLine) {
			return;
		}

		if (this.runningCommand) {
			return;
		}

		const printable =
			!domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
		domEvent.preventDefault();
		switch (domEvent.keyCode) {
			case 8: {
				// delete
				if (this.index === 0) {
					break;
				}
				const line =
					this.line.substring(0, this.index - 1) +
					this.line.substring(this.index, this.line.length);
				this.setLine(line, this.index - 1);
				break;
			}

			case 9: {
				// tab
				this.autocomplete();
				break;
			}

			case 13: {
				// enter
				this.handleEnterKeyEvent();
				break;
			}

			case 37: {
				// left arrow
				if (this.index === 0) {
					break;
				}
				this.terminal.write(key);
				this.index -= 1;
				break;
			}

			case 38: {
				// up arrow
				this.setLine(this.commandLineHistory.previous(this.line));
				break;
			}

			case 39: {
				// right arrow
				if (this.index === this.line.length) {
					break;
				}
				this.terminal.write(key);
				this.index += 1;
				break;
			}

			case 40: {
				// down arrow
				this.setLine(this.commandLineHistory.next(this.line));
				break;
			}

			default: {
				if (printable) {
					this.addToLine(key);
				}
			}
		}
	}

	private consoleLog(arg: any) {
		if (typeof arg === 'string') {
			for (const ln of arg.split('\n')) {
				this.terminal.writeln(ln);
			}
		} else if (typeof arg === 'number') {
			this.terminal.writeln(yellow(String(arg)));
		} else if (typeof arg === 'object' && typeof arg.stack === 'string') {
			// Error object
			for (const line of arg.stack.split('\n')) {
				this.terminal.writeln(line);
			}
		} else {
			this.terminal.writeln(String(arg));
		}
	}

	private consoleError(arg: any) {
		this.consoleLog(arg);
	}

	private runCurrentLine() {
		const options: IRunCliAndExitOptions = {
			args: splitWords(this.line),
			consoleError: (...args: any[]) => {
				this.consoleError(args[0]);
			},
			consoleLog: (...args: any[]) => {
				this.consoleLog(args[0]);
			},
			processExit() {},
			columns: this.terminal.cols,
		};
		this.runningCommand = true;
		this.terminal.write('\r\n');
		runCliAndExit(Cli(this.root), options)
			.catch((err) => {
				console.log(err); // eslint-disable-line no-console
			})
			.then(() => {
				this.line = '';
				this.index = 0;
				this.runningCommand = false;
				this.prompt();
			});
	}

	private setLine(line: string, index?: number) {
		if (line === this.line) {
			return;
		}
		this.settingCurrentLine = true;
		const changeInLength = line.length - this.line.length;
		let sequence = '';
		sequence += '\r';
		sequence += PS1;
		sequence += line;
		if (changeInLength < 0) {
			sequence += ' '.repeat(-1 * changeInLength);
			sequence += '\b'.repeat(-1 * changeInLength);
		}
		if (typeof index === 'number') {
			sequence += '\b'.repeat(line.length - index);
		}
		this.terminal.write(sequence, () => {
			this.line = line;
			this.index = typeof index === 'number' ? index : line.length;
			this.settingCurrentLine = false;
		});
	}

	private handleEnterKeyEvent() {
		this.commandLineHistory.submit(this.line);
		this.runCurrentLine();
	}

	private addToLine(str: string) {
		const line =
			this.line.substring(0, this.index) +
			str +
			this.line.substring(this.index);
		this.setLine(line, this.index + str.length);
	}

	private autocomplete(): void {
		const lineBeforeCursor = this.line.substring(0, this.index);
		const wordsBeforeCursor = splitWords(lineBeforeCursor);
		let args: string[];
		let search = '';
		if (lineBeforeCursor.endsWith(' ')) {
			search = '';
			args = wordsBeforeCursor;
		} else {
			[search = ''] = wordsBeforeCursor.slice(-1);
			args = wordsBeforeCursor.slice(0, -1);
		}

		const completions = autocomplete(this.root, args, search);
		console.log(args, search);

		switch (completions.length) {
			case 0: {
				return;
			}
			case 1: {
				this.addToLine(completions[0]);
				break;
			}
			default: {
				// Write out the completions
				this.consoleLog('');
				for (const completion of completions) {
					this.consoleLog(`${INDENTATION}${search}${completion}`);
				}
				// Re-write line
				const countAfterCursor = this.line.length - this.index;
				this.terminal.write(
					`${PS1}${this.line}${'\b'.repeat(countAfterCursor)}`,
				);
			}
		}
	}
}
