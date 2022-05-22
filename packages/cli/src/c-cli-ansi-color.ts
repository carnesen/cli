import { CCliColor } from './c-cli-color';

/** Unicode "escape" character */
const ESC = '\u001b';

/**
 * Implements the {@link CCliColor} interface by wrapping the provided text in
 * ANSI escape sequences interpreted and rendered appropriately by the terminal
 * emulator */
export class CCliAnsiColor implements CCliColor {
	protected constructor() {}

	public blue(message: string): string {
		return `${ESC}[34m${message}${ESC}[39m`;
	}

	public bold(message: string): string {
		return `${ESC}[1m${message}${ESC}[22m`;
	}

	public green(message: string): string {
		return `${ESC}[32m${message}${ESC}[39m`;
	}

	public red(message: string): string {
		return `${ESC}[31m${message}${ESC}[39m`;
	}

	public static create(): CCliAnsiColor {
		return new CCliAnsiColor();
	}
}
