/* eslint-disable no-redeclare */
import { CliBranch, ExcludeCommandType } from './types';
import { CLI_BRANCH } from './constants';

type Config = ExcludeCommandType<CliBranch>;

/**
 * A factory function for creating command branches
 * @remarks
 * @param config
 * @returns Returns the newly-created `CliBranch` object
 */
export function CliBranch(config: Config): CliBranch {
  const branch: CliBranch = {
    ...config,
    commandType: CLI_BRANCH,
  };
  return branch;
}
