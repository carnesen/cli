import { AnyArgParser, AnyNamedArgParsers } from './cli-arg-parser';
import { ICliBranch } from './cli-branch';
import { ICliLeaf } from './cli-leaf';

type AnyCliLeaf = ICliLeaf<AnyArgParser, AnyNamedArgParsers, AnyArgParser>;
export type Command = ICliBranch | AnyCliLeaf;
export type AnyCommand = ICliBranch | ICliLeaf<any, any, any>;

export type CommandStack = {
  parents: ICliBranch[];
  current: Command;
};

export type LeafStack = { parents: ICliBranch[]; current: AnyCliLeaf };
