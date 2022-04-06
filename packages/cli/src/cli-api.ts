import { partitionArgs } from './partition-args';
import { findCliTree } from './find-cli-tree';
import { parseArgs } from './parse-args';
import { parseNamedArgs } from './parse-named-args';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { TCliRoot } from './cli-tree';
import { CLI_COMMAND } from './cli-command';
import { ICli, ICliOptions } from './cli-options';
import { CliConsole } from './cli-logger';
import { CliAnsi } from './cli-ansi';

/**
 * A factory for [[`ICli.api`]]s
 *
 * @param root The root of this command-line interface's command tree
 * @param options
 */
export function CliApi(root: TCliRoot, options: ICliOptions = {}): ICli['api'] {
	const { console = CliLogger.create() } = options;

	const ansi = CliAnsi(options.ansi);

	return async function cliApi(args: string[]) {
		const tree = findCliTree(root, args);

		if (tree.message || tree.current.kind !== CLI_COMMAND) {
			throw new CliUsageError(tree.message, tree);
		}

		const { positionalArgs, namedArgs, doubleDashArgs } = partitionArgs(
			tree.args,
		);

		// We found "--help" among the arguments
		if (namedArgs.help) {
			throw new CliUsageError(undefined, tree);
		}

		const command = tree.current;

		// Pre-validation for positional argument group
		if (!command.positionalArgGroup && positionalArgs.length > 0) {
			throw new CliUsageError(
				`Unexpected argument "${positionalArgs[0]}" : Command "${command.name}" does not accept positional arguments`,
				tree,
			);
		}

		// All validation for named argument groups is done during parsing

		// Pre-validation for double-dash argument group
		if (!command.doubleDashArgGroup && doubleDashArgs) {
			throw new CliUsageError(
				`Command "${command.name}" does not allow "--" as an argument`,
			);
		}

		// Calls to `parseArgs` and `action` in this try/catch block could throw
		// `CliUsageError`, which we catch and enhance with the current `TCliTree`
		// context.
		try {
			let positionalValue: any;
			if (command.positionalArgGroup) {
				// Note that for named and double-dash args, we distinguish between
				// `undefined` and `[]`. For example, "cli" gives an double-dash args
				// `undefined` whereas "cli --" gives an double-dash args `[]`. For the
				// "positionalArgs", however, there is no such distinction. By convention,
				// we elect here to pass in `undefined` rather than an empty array when no
				// positional arguments are passed.
				positionalValue = await parseArgs(
					command.positionalArgGroup,
					positionalArgs.length > 0 ? positionalArgs : undefined,
					undefined,
				);
			}

			const namedValues = await parseNamedArgs(
				command.namedArgGroups || {},
				namedArgs,
			);

			let doubleDashValue: any;
			if (command.doubleDashArgGroup) {
				doubleDashValue = await parseArgs(
					command.doubleDashArgGroup,
					doubleDashArgs,
					'--',
				);
			}

			const result = await command.action({
				positionalValue,
				namedValues,
				doubleDashValue,
				console,
				ansi,
			});
			return result;
		} catch (exception: any) {
			if (exception && exception.code === CLI_USAGE_ERROR) {
				exception.tree = tree;
			}
			throw exception;
		}
	};
}
