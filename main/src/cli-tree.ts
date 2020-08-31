import { ICliCommandGroup } from './cli-command-group';
import { ICliCommand } from './cli-command';
import { ICliArgGroup } from './cli-arg-group';

/**
 * The root of a command tree
 */
export type TCliRoot =
	| ICliCommandGroup
	| ICliCommand<ICliArgGroup, any, ICliArgGroup>;

/**
 * Data structure representing a node in a command tree
 * */
export interface ICliTree {
	current: TCliRoot;
	parents: ICliCommandGroup[];
}

/**
 * Data structure representing a leaf node in a command tree
 * */
export interface ICliLeaf {
	current: ICliCommand;
	parents: ICliCommandGroup[];
}
