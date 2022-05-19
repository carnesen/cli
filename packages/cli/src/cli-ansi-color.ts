import { CliColor } from './cli-color';

const ESC = '\u001b';

export class CliAnsiColor implements CliColor {
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

	public static create(): CliAnsiColor {
		return new CliAnsiColor();
	}
}
