/** State machine for command history */
export class CommandHistory {
	private history: string[] = [];

	private index = 0;

	public constructor(history: string[] = [], line = '') {
		this.setHistory(...history.map((str) => str.trim()));
		this.current(line);
	}

	/**
	 * Set/get the current line
	 * @param line Set the
	 */
	public current(line?: string): string {
		if (typeof line === 'string') {
			this.history[this.index] = line;
		}
		return this.history[this.index];
	}

	/**
	 * Submit an item to the command-line history
	 * @param line
	 */
	public submit(line: string): void {
		const trimmed = line.trim();

		this.current(trimmed);

		// Remove duplicates
		this.setHistory(...this.history.filter((l) => l !== trimmed));

		if (this.current() !== trimmed) {
			this.setHistory(...this.history, trimmed);
		}
	}

	/**
	 * Go to the previous item in the history
	 * @param line
	 */
	public previous(line?: string): string {
		this.current(line);
		if (this.index > 0) {
			this.index -= 1;
		}
		return this.current();
	}

	/**
	 * Go to the next item in the history
	 * @param line
	 */
	public next(line?: string): string {
		this.current(line);
		if (this.index < this.indexOfLastLine()) {
			this.index += 1;
		}
		return this.current();
	}

	/**
	 * @returns All non-empty lines
	 */
	public list(): string[] {
		return this.history.filter((line) => line.length > 0);
	}

	/**
	 * @returns Index of the last line
	 */
	private indexOfLastLine(): number {
		return this.history.length - 1;
	}

	/**
	 * Set the command-line history and put the cursor on a new line
	 * @param history New lines to set
	 */
	private setHistory(...history: string[]): void {
		// Don't write empty lines into history
		this.history = history.filter((line) => line.length > 0);
		this.history.push('');
		this.index = this.indexOfLastLine();
	}
}
