export type TPartitioned = {
	positionalArgs: string[];
	namedArgs: { [argName: string]: string[] | undefined };
	doubleDashArgs: string[] | undefined;
};
/**
 * Partitions the provided raw args into groups based on separators:
 * <branch> <command> <positional arg> --named-arg <value> -- <double-dash args>
 * @param args Raw command-line arguments including separators
 */
export function partitionArgs(args: string[]): TPartitioned {
	const partitioned: TPartitioned = {
		positionalArgs: [],
		namedArgs: {},
		doubleDashArgs: undefined,
	};
	let currentArgs = partitioned.positionalArgs;
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i].trim();

		if (arg === '--') {
			// Everything after -- goes into "double dash"
			partitioned.doubleDashArgs = args.slice(i + 1);
			break;
		}

		if (arg.startsWith('--')) {
			const name = arg.slice(2).trim();
			const existingArgs = partitioned.namedArgs[name];
			if (existingArgs) {
				// Allow user to supply multi-valued args as, e.g.
				// --foo bar --foo baz
				// is equivalent to
				// --foo bar baz
				currentArgs = existingArgs;
			} else {
				currentArgs = [];
				partitioned.namedArgs[name] = currentArgs;
			}
			continue;
		}

		// This str is not "--"
		// nor have we hit "--"
		// nor is this str "--something"
		currentArgs.push(arg);
	}

	return partitioned;
}
