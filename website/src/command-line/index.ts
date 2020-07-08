export class CommandLine {
	private line: string;

	private index: number;

	public constructor(line = '', index?: number) {
		this.line = line;
		this.index =
			typeof index === 'number' ? this.indexInRange(index) : this.line.length;
	}

	public splitIntoArgs(
		line = this.line,
	): { args: string[]; singleQuoted: boolean; doubleQuoted: boolean } {
		const args: string[] = [];
		let arg: string | undefined;
		function append(char: string) {
			if (arg) {
				arg += char;
			} else {
				arg = char;
			}
		}
		let singleQuoted = false;
		let doubleQuoted = false;
		for (const char of line) {
			switch (char) {
				case '"': {
					if (singleQuoted) {
						append(char);
					} else {
						doubleQuoted = !doubleQuoted;
					}
					break;
				}
				case "'": {
					if (doubleQuoted) {
						append(char);
					} else {
						singleQuoted = !singleQuoted;
					}
					break;
				}
				case ' ': {
					if (singleQuoted || doubleQuoted) {
						append(char);
					} else if (typeof arg === 'string') {
						args.push(arg);
						arg = undefined;
					}
					break;
				}
				default: {
					append(char);
				}
			}
		}
		if (arg) {
			args.push(arg);
		}
		return { args, singleQuoted, doubleQuoted };
	}

	public indexInRange(index: number): number {
		return Math.min(Math.max(0, index), this.line.length);
	}

	public splitIntoArgsAndSearch(): {
		args: string[];
		search: string;
		singleQuoted: boolean;
		doubleQuoted: boolean;
	} {
		const lineBeforeCursor = this.line.substring(0, this.index);
		const {
			args: wordsBeforeCursor,
			singleQuoted,
			doubleQuoted,
		} = this.splitIntoArgs(lineBeforeCursor);
		let args: string[];
		let search = '';
		if (lineBeforeCursor.endsWith(' ')) {
			search = '';
			args = wordsBeforeCursor;
		} else {
			[search = ''] = wordsBeforeCursor.slice(-1);
			args = wordsBeforeCursor.slice(0, -1);
		}
		return { args, search, singleQuoted, doubleQuoted };
	}

	public del(): boolean {
		if (this.index > 0) {
			this.line =
				this.line.substring(0, this.index - 1) +
				this.line.substring(this.index, this.line.length);
			this.index -= 1;
			return true;
		}
		return false;
	}

	public insert(str: string): string {
		if (str.length === 0) {
			return '';
		}
		const lineBeforeCursor = this.line.substring(0, this.index);
		const lineAfterCursor = this.line.substring(this.index);
		this.line = `${lineBeforeCursor}${str}${lineAfterCursor}`;
		this.index += str.length;
		let sequence = '';
		sequence += str;
		sequence += lineAfterCursor;
		sequence += '\b'.repeat(lineAfterCursor.length);
		return sequence;
	}

	public next(): boolean {
		if (this.index < this.line.length) {
			this.index += 1;
			return true;
		}
		return false;
	}

	public previous(): boolean {
		if (this.index > 0) {
			this.index -= 1;
			return true;
		}
		return false;
	}

	public reset(): void {
		this.line = '';
		this.index = 0;
	}

	public setValue(line: string): string {
		const changeInLength = line.length - this.line.length;

		let s = '';
		s += '\b'.repeat(this.index);
		s += line;
		if (changeInLength < 0) {
			s += ' '.repeat(-1 * changeInLength);
			s += '\b'.repeat(-1 * changeInLength);
		}
		// Now the cursor is at the end of the line
		this.line = line;
		this.index = this.line.length;

		// Add backspaces to move the cursor to the index
		s += '\b'.repeat(line.length - this.index);
		return s;
	}

	public sequence(): string {
		let s = '';
		s += this.line;
		s += '\b'.repeat(this.line.length - this.index);
		return s;
	}

	public value(): string {
		return this.line;
	}
}
