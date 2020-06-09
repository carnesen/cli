import { partitionArgs } from './partition-args';
import { getNamedValues } from './get-named-values';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { parseArgs } from './parse-args';
import { navigateToCommand } from './navigate-to-command';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';
import { CliCommandNode } from './cli-node';

/** A JavaScript command runner. Useful for unit testing CLI logic. */
export interface ICli {
	(...args: string[]): Promise<any>;
}

/** (Advanced) Wrap the default [[`ICli`]] to modify its behavior */
export interface ICliEnhancer {
	(cli: ICli): ICli;
}

export interface ICliOptions {
	/** (Advanced) Modify the CLI's behavior. Passed to [[`Cli`]] */
	enhancer?: ICliEnhancer;
}

/**
 * A factory for [[`ICli}s, the core of {@linkcode runCliAndExit`]]
 *
 * @param root The root of this CLI's command tree
 */
export function Cli(
	root: ICliBranch | ICliCommand<any, any, any>,
	options: ICliOptions = {},
): ICli {
	const { enhancer } = options;

	if (enhancer) {
		return enhancer(cli);
	}

	return cli;

	async function cli(...args: string[]) {
		const [leaf, remainingArgs]: [CliCommandNode, string[]] = navigateToCommand(
			root,
			args,
		);

		const { positionalArgs, namedArgs, escapedArgs } = partitionArgs(
			remainingArgs,
		);
		if (namedArgs.help) {
			throw new CliUsageError(undefined, leaf);
		}
		const command = leaf.current;
		let argsValue: any;
		if (command.positionalParser) {
			// Note that for named and escaped args, we distinguish between
			// `undefined` and `[]`. For example, "cli" gives an escaped args
			// `undefined` whereas "cli --" gives an escaped args `[]`. For the
			// "positionalArgs", however, there is no such distinction. By convention,
			// we elect here to pass in `undefined` rather than an empty array when no
			// positional arguments are passed.
			argsValue = await parseArgs(
				command.positionalParser,
				positionalArgs.length > 0 ? positionalArgs : undefined,
				undefined,
				leaf,
			);
		} else if (positionalArgs.length > 0) {
			throw new CliUsageError(
				`Unexpected argument "${positionalArgs[0]}" : Command "${command.name}" does not accept positional arguments`,
				leaf,
			);
		}

		const namedValues = await getNamedValues(
			command.namedParsers || {},
			namedArgs,
			leaf,
		);

		let escapedValue: any;
		if (command.escapedParser) {
			escapedValue = await parseArgs(
				command.escapedParser,
				escapedArgs,
				'--',
				leaf,
			);
		} else if (escapedArgs) {
			throw new CliUsageError(
				`Command "${command.name}" does not allow "--" as an argument`,
			);
		}

		try {
			const result = await command.action(argsValue, namedValues, escapedValue);
			return result;
		} catch (exception) {
			if (exception && exception.code === CLI_USAGE_ERROR) {
				exception.node = leaf;
			}
			throw exception;
		}
	}
}
