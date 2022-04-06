/**
 * This module is the main entrypoint for the **@carnesen/cli** package
 */

// Command factory
export {
	CliCommand,
	ICliCommand,
	ICliCommandOptions,
	CLI_COMMAND,
} from './cli-command';

// Command-line interface (CLI) factory
export { Cli } from './cli';
export { ICli, ICliOptions } from './cli-options';

// Command group factory
export {
	CliCommandGroup,
	ICliCommandGroup,
	ICliCommandGroupOptions,
	CLI_COMMAND_GROUP,
} from './cli-command-group';

// Argument group factories
export {
	CliFlagArgGroup,
	ICliFlagArgGroupOptions,
} from './arg-group-factories/cli-flag-arg-group';
export {
	CliJsonArgGroup,
	ICliJsonArgGroupOptions,
} from './arg-group-factories/cli-json-arg-group';
export {
	CliNumberArgGroup,
	ICliNumberArgGroupOptions,
} from './arg-group-factories/cli-number-arg-group';
export {
	CliNumberArrayArgGroup,
	ICliNumberArrayArgGroupOptions,
} from './arg-group-factories/cli-number-array-arg-group';
export {
	CliStringChoiceArgGroup,
	ICliStringChoiceArgGroupOptions,
} from './arg-group-factories/cli-string-choice-arg-group';
export {
	CliStringArgGroup,
	ICliStringArgGroupOptions,
} from './arg-group-factories/cli-string-arg-group';
export {
	CliStringArrayArgGroup,
	ICliStringArrayArgGroupOptions,
} from './arg-group-factories/cli-string-array-arg-group';

// The rest of the exports are advanced features

// Description functions
export {
	TCliDescription,
	TCliDescriptionFunction,
	ICliDescriptionFunctionInput,
} from './cli-description';

// Isomorphic console interface
export { ICliLogger as ICliConsole } from './cli-logger';

// Isomorphic process interface
export { ICliProcess } from './cli-process';

// Text decoration
export { ICliAnsi, CliAnsi } from './cli-ansi';

// Error constructors
export { CliTerseError, CLI_TERSE_ERROR } from './cli-terse-error';
export { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';

// Custom ArgGroup
export { ICliArgGroup, TCliArgGroupArgs } from './cli-arg-group';

// Command tree
export { TCliRoot, ICliTree, ICliLeaf } from './cli-tree';

// Branding
export { CliWordMark } from './cli-word-mark';
