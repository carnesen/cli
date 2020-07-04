import { ICliTree } from './cli-tree';

/** "code" of a {@link CliUsageError} */
export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

/**
 * Thrown to print command usage and an error message but not a `stack`
 */
export class CliUsageError extends Error {
	/** The string constant [[`CLI_USAGE_ERROR`]] */
	public readonly code: typeof CLI_USAGE_ERROR;

	/** Used internally for constructing the command-line usage string */
	public tree?: ICliTree;

	/**
	 * @param message If provided, [[`runCliAndExit`]] will also print "Error: \<your
	 * message\>"
	 * @param tree Used internally for constructing the command-line usage string
	 */
	constructor(message?: string, tree?: ICliTree) {
		super(message);
		this.code = CLI_USAGE_ERROR;
		this.tree = tree;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
