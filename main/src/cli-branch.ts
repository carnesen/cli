import { CLI_BRANCH } from './constants';
import { ICliCommand } from './cli-command';

export interface ICliBranchOptions {
  /** Name of this command branch, typically a category like "user" or "cloud" */
  name: string;
  /** A short description of this command branch for command-line usage */
  description?: string;
  /** If `true`, this command will not appear in command-line usage */
  hidden?: boolean;
  /** Branches and/or commands under this branch */
  children: (ICliBranch | ICliCommand<any, any, any>)[];
}

/**
 * Interface describing a command branch
 */
export interface ICliBranch extends ICliBranchOptions {
  commandType: typeof CLI_BRANCH;
}

/**
 * A factory function for creating command branches
 * @remarks
 * @param options
 * @returns Returns the newly-created branch object
 * @example
 * ```typescript
 * const cloudBranch = CliBranch()
 * ```
 */
export function CliBranch(options: ICliBranchOptions): ICliBranch {
  return {
    ...options,
    commandType: CLI_BRANCH,
  };
}
