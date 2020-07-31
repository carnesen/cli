import { ICliCommand } from './cli-command';
import { TCliDescription } from './cli-description';

/** "kind" of an [[`ICliBranch`]] */
export const CLI_BRANCH = 'CLI_BRANCH';

/** Options for [[`CliBranch`]] */
export interface ICliBranchOptions {
	/** Name of this command branch, typically a category like "user" or "cloud" */
	name: string;

	/** A short description of this branch for command-line usage */
	description?: TCliDescription;

	/** If `true`, this branch will not appear in command-line usage */
	hidden?: boolean;

	/** [[`ICliBranch`]] and/or [[`ICliCommand`]]s underneath this branch */
	subcommands: (ICliBranch | ICliCommand<any, any, any>)[];
}

/**
 * A branch in a command tree
 */
export interface ICliBranch extends ICliBranchOptions {
	/** Used internally for discriminating between [[`ICliBranch`]]'s and
	 * [[`ICliCommand`]]'s */
	kind: typeof CLI_BRANCH;
}

/**
 * A factory for [[`ICliBranch`]]s
 * @param options
 * @returns An [[`ICliBranch`]] object
 * @example
 * ```typescript
 * const cloudBranch = CliBranch()
 * ```
 */
export function CliBranch(options: ICliBranchOptions): ICliBranch {
	return {
		...options,
		kind: CLI_BRANCH,
	};
}
