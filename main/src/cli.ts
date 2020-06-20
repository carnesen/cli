import { partitionArgs } from './partition-args';
import { findCliNode } from './find-cli-node';
import { parseArgs } from './parse-args';
import { parseNamedArgs } from './parse-named-args';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { TCliRoot } from './cli-tree';
import { CLI_COMMAND } from './cli-command';

/**
 * A command-line interface (CLI) function
 * */
export interface ICli {
	/**
	 * @param args The full set of command-line arguments. Defaults to
	 * `process.argv.slice(2)` in [[`runCliAndExit`]].
	 * @returns [Optional] The default CLI runner [[`runCliAndExit`]] will
	 * console.log the return value if there is one.
	 */
	(...args: string[]): Promise<any>;
}

/**
 * A factory for [[`ICli`]]s
 *
 * @param root The root of this command-line interface's command tree
 */
export function Cli(root: TCliRoot<any, any, any>): ICli {
	return async function cli(...args: string[]) {
		const node = findCliNode(root, args);

		if (node.message || node.current.kind !== CLI_COMMAND) {
			throw new CliUsageError(node.message, node);
		}

		const { positionalArgs, namedArgs, escapedArgs } = partitionArgs(node.args);

		// We found "--help" among the arguments
		if (namedArgs.help) {
			throw new CliUsageError(undefined, node);
		}

		const command = node.current;

		// Pre-validation for positional argument group
		if (!command.positionalArgGroup && positionalArgs.length > 0) {
			throw new CliUsageError(
				`Unexpected argument "${positionalArgs[0]}" : Command "${command.name}" does not accept positional arguments`,
				node,
			);
		}

		// All validation for named argument groups is done during parsing

		// Pre-validation for escaped argument group
		if (!command.escapedArgGroup && escapedArgs) {
			throw new CliUsageError(
				`Command "${command.name}" does not allow "--" as an argument`,
			);
		}

		// Calls to `parseArgs` and `action` in this try/catch block could throw
		// `CliUsageError`, which we catch and enhance with the current `TCliNode`
		// context.
		try {
			let argsValue: any;
			if (command.positionalArgGroup) {
				// Note that for named and escaped args, we distinguish between
				// `undefined` and `[]`. For example, "cli" gives an escaped args
				// `undefined` whereas "cli --" gives an escaped args `[]`. For the
				// "positionalArgs", however, there is no such distinction. By convention,
				// we elect here to pass in `undefined` rather than an empty array when no
				// positional arguments are passed.
				argsValue = await parseArgs(
					command.positionalArgGroup,
					positionalArgs.length > 0 ? positionalArgs : undefined,
					undefined,
				);
			}

			const namedValues = await parseNamedArgs(
				command.namedArgGroups || {},
				namedArgs,
			);

			let escapedValue: any;
			if (command.escapedArgGroup) {
				escapedValue = await parseArgs(
					command.escapedArgGroup,
					escapedArgs,
					'--',
				);
			}

			const result = await command.action(argsValue, namedValues, escapedValue);
			return result;
		} catch (exception) {
			if (exception && exception.code === CLI_USAGE_ERROR) {
				exception.node = node;
			}
			throw exception;
		}
	};
}
