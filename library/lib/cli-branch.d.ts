import { CLI_BRANCH } from './constants';
import { ICliCommand } from './cli-command';
export declare type CliBranchOptions = {
    name: string;
    description?: string;
    hidden?: boolean;
    subcommands: (ICliBranch | ICliCommand<any, any, any>)[];
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
export declare function CliBranch(options: CliBranchOptions): ICliBranch;
//# sourceMappingURL=cli-branch.d.ts.map