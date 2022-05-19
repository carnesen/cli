import { ICliCommandGroup } from './cli-command-group';
import { ICliCommand } from './cli-command';
import { CliArgGroup } from './cli-arg-group';

/** Root of a command tree */
export type CliRoot =
	| ICliCommandGroup
	| ICliCommand<CliArgGroup, any, CliArgGroup>;

/** Data structure representing a node in a command tree */
export type CliTree = {
	current: CliRoot;
	parents: ICliCommandGroup[];
};

/** Data structure representing a leaf node in a command tree */
export type CliLeaf = {
	current: ICliCommand;
	parents: ICliCommandGroup[];
};
