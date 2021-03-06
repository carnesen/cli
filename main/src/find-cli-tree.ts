import { ICliTree, TCliRoot } from './cli-tree';
import { CLI_COMMAND } from './cli-command';
import { CLI_COMMAND_GROUP } from './cli-command-group';

/**
 * The result of calling [[`findCliTree`]]
 */
export interface IFindCliTreeResult extends ICliTree {
	/** Passed args past those used during navigation */
	args: string[];
	/** An error message describing why navigation stopped */
	message?: string;
}

/**
 * Walk a tree of commands to find the one selected by the arguments provided
 * @param root - A command tree root
 * @param args - An array of command-line arguments
 * @returns The result of the search
 */
export function findCliTree(
	root: TCliRoot,
	args: string[],
): IFindCliTreeResult {
	return recursiveFindCliTree({ current: root, parents: [], args });
}

function recursiveFindCliTree(result: IFindCliTreeResult): IFindCliTreeResult {
	// Terminate recursion if current is a command
	if (result.current.kind === CLI_COMMAND) {
		return result;
	}

	if (result.current.kind === CLI_COMMAND_GROUP) {
		if (result.args.length === 0) {
			// Example: Full command is "cli user login". They've done "cli user". In
			// this case we want to print the usage string but not an error message.
			return result;
		}

		// So that we don't show a "Bad command" error message on "--help"
		if (result.args[0] === '--help') {
			return result;
		}

		const next = result.current.subcommands.find(
			(subcommand) => subcommand.name === result.args[0],
		);

		if (!next) {
			// E.g. Should be "cli login". Is "cli log".
			return { ...result, message: `Bad command "${result.args[0]}"` };
		}

		return recursiveFindCliTree({
			parents: [...result.parents, result.current],
			current: next,
			args: result.args.slice(1),
		});
	}

	throw new Error('Unexpected kind');
}
