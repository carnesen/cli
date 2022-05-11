import { ICliTree } from './cli-tree';

/** "code" of a {@link CliUsageError} */
export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

/**
 * Thrown to print usage documentation and an error message
 */
export class CliUsageError extends Error {
	/** The string constant [[`CLI_USAGE_ERROR`]] */
	public readonly code: typeof CLI_USAGE_ERROR;

	/** Used internally for generating usage documentation */
	public tree?: ICliTree;

	/**
	 * @param message If provided, [[`ICli.run`]] will also print "Error: \<your
	 * message\>"
	 * @param tree Used internally for constructing the command-line usage string
	 */
	public constructor(message?: string, tree?: ICliTree) {
		super(message);
		this.code = CLI_USAGE_ERROR;
		this.tree = tree;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
