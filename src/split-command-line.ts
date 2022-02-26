export function splitCommandLine(line: string): {
	args: string[];
	quoteChar: string;
} {
	const args: string[] = [];
	let arg: string | undefined;
	function append(char: string) {
		if (arg) {
			arg += char;
		} else {
			arg = char;
		}
	}
	let quoteChar = '';
	for (const char of line) {
		switch (char) {
			case '"':
			case "'": {
				if (!quoteChar) {
					// This is a new quoted string
					quoteChar = char;
				} else if (char !== quoteChar) {
					// We are in the middle of quoted string and the current quote
					// character is not the same type we are in the middle of.
					append(char);
				} else {
					// This terminates a quoted string
					quoteChar = '';
				}
				break;
			}
			case ' ': {
				if (quoteChar) {
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
	return { args, quoteChar };
}
