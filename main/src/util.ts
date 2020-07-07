import { CliUsageError } from './cli-usage-error';

export function wrapInSquareBrackets(str: string): string {
	return `[${str}]`;
}

export function convertToNumber(rawValue: string): number {
	let value = NaN;
	if (rawValue.length > 0) {
		value = Number(rawValue);
	}
	if (Number.isNaN(value)) {
		throw new CliUsageError(`"${rawValue}" is not a number`);
	}
	return value;
}

export const ansiColors = {
	red(message: string): string {
		return `\u001b[31m${message}\u001b[39m`;
	},
};
