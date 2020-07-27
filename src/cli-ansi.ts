/**
 * Methods for decorating command output with ANSI escape codes
 * https://en.wikipedia.org/wiki/ANSI_escape_code
 */
export interface ICliAnsi {
	/** */
	red(message: string): string;
}

const ESC = '\u001b';

/**
 * A factory for [[`ICliAnsi`]]s
 */
export function CliAnsi(): ICliAnsi {
	return {
		red(message: string): string {
			return `${ESC}[31m${message}${ESC}[39m`;
		},
	};
}

/**
 * A factory for [[`ICliAnsi`]]s that do NOT decorate the provided text
 */
export function CliNoAnsi(): ICliAnsi {
	return {
		red(message: string): string {
			return message;
		},
	};
}
