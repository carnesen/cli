import { AnyParser, AnyNamedParsers } from './cli-arg-parser';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';

type AnyCliCommand = ICliCommand<AnyParser, AnyNamedParsers, AnyParser>;
export type BranchOrCommand = ICliBranch | AnyCliCommand;

export type Node = {
  parents: ICliBranch[];
  current: BranchOrCommand;
};

export type Leaf = { parents: ICliBranch[]; current: AnyCliCommand };
