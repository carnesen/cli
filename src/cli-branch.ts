import { CLI_BRANCH } from './constants';
import { ICliCommand } from './cli-command';

export type CliBranchOptions = {
  name: string;
  description?: string;
  hidden?: boolean;
  children: (ICliBranch | ICliCommand<any, any, any>)[];
};

/**
 * Interface describing a command branch
 */
export interface ICliBranch extends CliBranchOptions {
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
export function CliBranch(options: CliBranchOptions): ICliBranch {
  return {
    ...options,
    commandType: CLI_BRANCH,
  };
}
