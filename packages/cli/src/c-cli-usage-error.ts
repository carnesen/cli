import { CCliTree } from './c-cli-tree';

/** "code" of a {@link CCliUsageError} */
export const C_CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

/** Thrown to print usage documentation and an error message */
export class CCliUsageError extends Error {
	/** The string constant {@link C_CLI_USAGE_ERROR} */
	public readonly code = C_CLI_USAGE_ERROR;

	/**
	 * @param message If provided, the {@link CCli} runner will also print
	 * "Error: \<your message\>" when it encounters this error
	 * @param tree Used internally for constructing the command-line usage string
	 * */
	public constructor(public readonly message = '', public tree?: CCliTree) {
		super(message);
	}
}
