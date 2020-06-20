import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';
import { ICliArgGroup } from './cli-arg-group';

/**
 * The root of a command tree
 */
export type TCliRoot<
	TPositionalArgGroup extends ICliArgGroup = ICliArgGroup,
	TNamedArgGroups extends {
		[name: string]: ICliArgGroup;
	} = {
		[name: string]: ICliArgGroup;
	},
	TEscapedArgGroup extends ICliArgGroup = ICliArgGroup
> =
	| ICliBranch
	| ICliCommand<TPositionalArgGroup, TNamedArgGroups, TEscapedArgGroup>;

/**
 * A node in a command tree
 * */
export interface ICliNode {
	current: TCliRoot;
	parents: ICliBranch[];
}

/**
 * A leaf node in a command tree
 * */
export interface ICliLeaf {
	current: ICliCommand;
	parents: ICliBranch[];
}
