export type NamedArgs = {
	[argName: string]: string[] | undefined;
};

export function partitionArgs(
	args: string[],
): {
	positionalArgs: string[];
	escapedArgs: string[] | undefined;
	namedArgs: NamedArgs;
} {
	const positionalArgs: string[] = [];
	const namedArgs: NamedArgs = {};
	let escapedArgs: string[] | undefined;
	let currentArgs = positionalArgs;
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i].trim();

		if (arg === '--') {
			// Everything after -- goes into "escaped"
			escapedArgs = args.slice(i + 1);
			break;
		}

		if (arg.startsWith('--')) {
			const name = arg.slice(2).trim();
			const existingArgs = namedArgs[name];
			if (existingArgs) {
				// Allow user to supply multi-valued args as, e.g.
				// --foo bar --foo baz
				// is equivalent to
				// --foo bar baz
				currentArgs = existingArgs;
			} else {
				currentArgs = [];
				namedArgs[name] = currentArgs;
			}
			continue;
		}

		// This str is not "--"
		// nor have we hit "--"
		// nor is this str "--something"
		currentArgs.push(arg);
	}

	return {
		positionalArgs,
		namedArgs,
		escapedArgs,
	};
}
