import { CliProcess } from './cli-process';

/**
 * Methods for decorating command output with ANSI escape codes
 * https://en.wikipedia.org/wiki/ANSI_escape_code
 */
export interface ICliAnsi {
	/** Whether or not ANSI decoration is enabled */
	enabled: boolean;

	/** Decorate the text blue */
	blue(message: string): string;

	/** Decorate the text bold */
	bold(message: string): string;

	/** Decorate the text red */
	green(message: string): string;

	/** Decorate the text red */
	red(message: string): string;
}

const ESC = '\u001b';

const PROCESS = CliProcess();

const ANSI: ICliAnsi = {
	enabled: true,
	blue(message: string): string {
		return `${ESC}[34m${message}${ESC}[39m`;
	},
	bold(message: string): string {
		return `${ESC}[1m${message}${ESC}[22m`;
	},
	green(message: string): string {
		return `${ESC}[32m${message}${ESC}[39m`;
	},
	red(message: string): string {
		return `${ESC}[31m${message}${ESC}[39m`;
	},
};

const NO_ANSI = { enabled: false } as ICliAnsi;

for (const propertyName of Object.keys(ANSI)) {
	const property = ANSI[propertyName as keyof ICliAnsi];
	if (typeof property === 'function') {
		(NO_ANSI as any)[propertyName] = (message: string) => message;
	}
}

/**
 * A factory for [[`ICliAnsi`]]s
 */
export function CliAnsi(
	enabled = PROCESS.stdout.isTTY && PROCESS.stderr.isTTY,
): ICliAnsi {
	return enabled ? { ...ANSI } : { ...NO_ANSI };
}
