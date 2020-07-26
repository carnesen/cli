import { Terminal } from 'xterm';
import {
	Cli,
	ICliBranch,
	ICliCommand,
	CliBranch,
	ICliOptions,
} from '@carnesen/cli';

import {
	DELETE_KEY,
	DOWN_ARROW_KEY,
	ENTER_KEY,
	LEFT_ARROW_KEY,
	RIGHT_ARROW_KEY,
	TAB_KEY,
	UP_ARROW_KEY,
} from './constants';
import { CommandHistory } from './command-history';
import { green, bold } from './util';
import { HistoryCommand } from './history-command';
import { autocomplete } from './autocomplete';
import { CommandLine } from './command-line';

const inspect = require('util-inspect');

const INDENTATION = '    ';

export interface ICliReplOptions {
	/** [[`ICliBranch`]] and/or [[`ICliCommand`]]s underneath this branch */
	subcommands: (ICliBranch | ICliCommand<any, any, any>)[];
	/** An XTerm.js Terminal to run the REPL in */
	terminal: Terminal;
	/** A short description of this branch for command-line usage */
	description?: string;
	/** History lines */
	history?: string[];
	/** Initial command line */
	line?: string;
	/** Whether or not to submit the initial line */
	submit?: boolean;
}

type KeyEvent = { key: string; domEvent: KeyboardEvent };

const PS1 = `${green('$')} `;

export class CliRepl {
	private readonly terminal: Terminal;

	private runningCommand = false;

	private settingCurrentLine = false;

	private readonly commandHistory: CommandHistory;

	private readonly commandLine: CommandLine;

	private submit: boolean;

	private readonly root: ICliBranch;

	public constructor({
		description,
		subcommands,
		terminal,
		history,
		line,
		submit,
	}: ICliReplOptions) {
		this.terminal = terminal;
		this.commandHistory = new CommandHistory(history, line);
		this.commandLine = new CommandLine(this.commandHistory.current());
		this.submit = submit || false;
		this.root = CliBranch({
			description,
			name: '',
			subcommands: [...subcommands, HistoryCommand(this.commandHistory)],
		});
	}

	public start(): void {
		this.terminal.onKey((event) => {
			this.handleKeyEvent(event);
		});

		this.terminal.focus();

		if (!this.submit) {
			this.consoleLog(`Hit ${bold('"Enter"')} to get started.`);
		}

		this.prompt();

		if (this.submit) {
			this.runCurrentLine();
		}
	}

	private prompt() {
		this.terminal.write(`\r\n${PS1}${this.commandLine.sequence()}`);
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
			case DELETE_KEY: {
				if (this.commandLine.del()) {
					this.terminal.write('\b \b');
				}
				break;
			}

			case TAB_KEY: {
				this.autocomplete();
				break;
			}

			case ENTER_KEY: {
				this.runCurrentLine();
				break;
			}

			case LEFT_ARROW_KEY: {
				if (this.commandLine.previous()) {
					this.terminal.write(key);
				}
				break;
			}

			case UP_ARROW_KEY: {
				this.setLine(this.commandHistory.previous(this.commandLine.value()));
				break;
			}

			case RIGHT_ARROW_KEY: {
				if (this.commandLine.next()) {
					this.terminal.write(key);
				}
				break;
			}

			case DOWN_ARROW_KEY: {
				this.setLine(this.commandHistory.next(this.commandLine.value()));
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
		let str: string;
		// Normalize line ending at the start of the string
		if (typeof arg === 'string') {
			str = arg.startsWith('\n') ? `\r${arg}` : arg;
		} else if (typeof arg.stack === 'string') {
			str = arg.stack;
		} else {
			str = inspect(arg, { colors: true }) || '';
		}
		const strWithNormalizedLineEndings = str.replace(/([^\r])\n/g, '$1\r\n');
		this.terminal.write(strWithNormalizedLineEndings);
	}

	private consoleError(arg: any) {
		this.consoleLog(arg);
	}

	private runCurrentLine(): void {
		this.terminal.write('\r\n');
		this.commandHistory.submit(this.commandLine.value());
		const {
			args,
			singleQuoted,
			doubleQuoted,
		} = this.commandLine.splitIntoArgs();
		if (singleQuoted || doubleQuoted) {
			this.consoleError(
				`Error: ${singleQuoted ? 'Single' : 'Double'} quotes are not balanced`,
			);
			this.prompt();
			return;
		}
		const options: ICliOptions = {
			console: {
				error: (..._args: any[]) => {
					this.consoleError(_args[0]);
				},
				log: (..._args: any[]) => {
					this.consoleLog(_args[0]);
				},
			},
			columns: this.terminal.cols,
		};
		this.runningCommand = true;
		Cli(this.root, options)
			.run(args)
			.then(() => {
				this.commandLine.reset();
				this.runningCommand = false;
				this.prompt();
			});
	}

	private setLine(line: string) {
		this.settingCurrentLine = true;
		const sequence = this.commandLine.setValue(line);
		this.terminal.write(sequence, () => {
			this.settingCurrentLine = false;
		});
	}

	private addToLine(str: string) {
		this.terminal.write(this.commandLine.insert(str));
	}

	private autocomplete(): void {
		const {
			args,
			search,
			singleQuoted,
			doubleQuoted,
		} = this.commandLine.splitIntoArgsAndSearch();
		const completions = autocomplete(this.root, args, search);

		switch (completions.length) {
			case 0: {
				return;
			}
			case 1: {
				let completion = completions[0];
				if (completions[0].endsWith(' ')) {
					const completionWithoutSpace = completion.substring(
						0,
						completions[0].length - 1,
					);
					if (singleQuoted) {
						completion = `${completionWithoutSpace}' `;
					} else if (doubleQuoted) {
						completion = `${completionWithoutSpace}" `;
					}
				}
				this.addToLine(completion);
				break;
			}
			default: {
				// Write out the completions
				for (const completion of completions) {
					this.consoleLog(`${INDENTATION}${search}${completion}`);
				}
				// Re-write line
				this.prompt();
			}
		}
	}
}
