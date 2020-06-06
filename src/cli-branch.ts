import { ICliCommand } from './cli-command';

/** "kind" of an {@linkcode ICliBranch} */
export const CLI_BRANCH = 'CLI_BRANCH';

/** Options for {@linkcode CliBranch} */
export interface ICliBranchOptions {
  /** Name of this command branch, typically a category like "user" or "cloud" */
  name: string;

  /** A short description of this branch for command-line usage */
  description?: string;

  /** If `true`, this branch will not appear in command-line usage */
  hidden?: boolean;

  /** Branches and/or commands underneath this branch */
  children: (ICliBranch | ICliCommand<any, any, any>)[];
}

/**
 * A branch in a command tree
 */
export interface ICliBranch extends ICliBranchOptions {
  /** Used internally for discriminating between {@linkcode ICliBranch}'s and
   * {@linkcode ICliCommand}'s */
  kind: typeof CLI_BRANCH;
}

/**
 * A factory for {@linkcode ICliBranch} objects
 * @param options
 * @returns An {@linkcode ICliBranch} object
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
