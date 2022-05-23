import { CCliTree } from './c-cli-tree';

/** Thrown to print usage documentation and an error message */
export class CCliUsageError extends Error {
	/**
	 * @param message If provided, the {@link CCli} runner will also print
	 * "Error: \<your message\>" when it encounters this error
	 * @param tree Used internally for constructing the command-line usage string
	 * */
	public constructor(public readonly message = '', public tree?: CCliTree) {
		super(message);
	}
}
