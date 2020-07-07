export function green(message: string): string {
	return `\u001b[32m${message}\u001b[39m`;
}

export function bold(message: string): string {
	return `\u001b[1m${message}\u001b[22m`;
}
