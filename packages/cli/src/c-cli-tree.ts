import { CCliCommandGroup } from './c-cli-command-group';
import { CCliCommand } from './c-cli-command';
import { CCliArgGroup } from './c-cli-arg-group';

/** Root of a command tree */
export type CCliRoot =
	| CCliCommandGroup
	| CCliCommand<CCliArgGroup, any, CCliArgGroup>;

/** Data structure representing a node in a command tree */
export type CCliTree = {
	current: CCliRoot;
	parents: CCliCommandGroup[];
};

/** Data structure representing a leaf node in a command tree */
export type CCliLeaf = {
	current: CCliCommand;
	parents: CCliCommandGroup[];
};
