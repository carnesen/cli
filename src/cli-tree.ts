import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';
import { ICliArgGroup } from './cli-arg-group';

/**
 * The root of a command tree
 */
export type TCliRoot =
	| ICliBranch
	| ICliCommand<ICliArgGroup, any, ICliArgGroup>;

/**
 * Data structure representing a node in a command tree
 * */
export interface ICliTree {
	current: TCliRoot;
	parents: ICliBranch[];
}

/**
 * Data structure representing a leaf node in a command tree
 * */
export interface ICliLeaf {
	current: ICliCommand;
	parents: ICliBranch[];
}
