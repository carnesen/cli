import { AnyArgParser, AnyNamedArgParsers } from './cli-arg-parser';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';
declare type AnyCliCommand = ICliCommand<AnyArgParser, AnyNamedArgParsers, AnyArgParser>;
export declare type BranchOrCommand = ICliBranch | AnyCliCommand;
export declare type BranchOrAnyCommand = ICliBranch | ICliCommand<any, any, any>;
export declare type BranchOrCommandStack = {
    parents: ICliBranch[];
    current: BranchOrCommand;
};
export declare type CommandStack = {
    parents: ICliBranch[];
    current: AnyCliCommand;
};
export {};
//# sourceMappingURL=types.d.ts.map