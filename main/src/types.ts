import { AnyArgParser, AnyNamedArgParsers } from './cli-arg-parser';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';

type AnyCliCommand = ICliCommand<AnyArgParser, AnyNamedArgParsers, AnyArgParser>;
export type BranchOrCommand = ICliBranch | AnyCliCommand;
export type BranchOrAnyCommand = ICliBranch | ICliCommand<any, any, any>;

export type BranchOrCommandStack = {
  parents: ICliBranch[];
  current: BranchOrCommand;
};

export type CommandStack = { parents: ICliBranch[]; current: AnyCliCommand };
