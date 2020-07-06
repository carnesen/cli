import { Terminal } from 'xterm';
import {
	runCliAndExit,
	IRunCliAndExitOptions,
	Cli,
	ICliBranch,
	ICliCommand,
	CliBranch,
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

		if (this.commandLine.value()) {
			this.terminal.write(this.commandLine.value());
		}

		if (this.submit) {
			this.handleEnterKeyEvent();
		}
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
				this.handleEnterKeyEvent();
				break;
			}

			case LEFT_ARROW_KEY: {
				if (this.commandLine.previous()) {
					this.terminal.write(key);
				}
				break;
			}

			case UP_ARROW_KEY: {
				this.renderLine(this.commandHistory.previous(this.commandLine.value()));
				break;
			}

			case RIGHT_ARROW_KEY: {
				if (this.commandLine.next()) {
					this.terminal.write(key);
				}
				break;
			}

			case DOWN_ARROW_KEY: {
				this.renderLine(this.commandHistory.next(this.commandLine.value()));
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
		if (typeof arg === 'string') {
			if (arg.startsWith('\n')) {
				str = `\r${arg}`;
			} else if (arg.startsWith('\r\n')) {
				str = arg;
			} else {
				str = `\r\n${arg}`;
			}
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
		const options: IRunCliAndExitOptions = {
			args,
			consoleError: (..._args: any[]) => {
				this.consoleError(_args[0]);
			},
			consoleLog: (..._args: any[]) => {
				this.consoleLog(_args[0]);
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
				this.commandLine.reset();
				this.runningCommand = false;
				this.prompt();
			});
	}

	private renderLine(line: string, index?: number) {
		this.settingCurrentLine = true;
		const sequence = this.commandLine.setValue(line, index);
		this.terminal.write(sequence, () => {
			this.settingCurrentLine = false;
		});
	}

	private handleEnterKeyEvent() {
		this.commandHistory.submit(this.commandLine.value());
		this.runCurrentLine();
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
