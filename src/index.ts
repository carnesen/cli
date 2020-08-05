// Command-line interface runner
export { Cli } from './cli';
export { ICli, ICliOptions } from './cli-options';

// Branch factory
export {
	CliBranch,
	ICliBranch,
	ICliBranchOptions,
	CLI_BRANCH,
} from './cli-branch';

// Command factory
export {
	CliCommand,
	ICliCommand,
	ICliCommandOptions,
	CLI_COMMAND,
} from './cli-command';

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

// Advanced: Description functions
export {
	TCliDescription,
	IDescriptionInput,
	TCliDescriptionFunction,
} from './cli-description';

// Advanced: Universal console interface
export { ICliConsole } from './cli-console';

// Advanced: Universal process interface
export { ICliProcess } from './cli-process';

// Advanced: Text decoration
export { ICliAnsi, CliAnsi } from './cli-ansi';

// Advanced: Error constructors
export { CliTerseError, CLI_TERSE_ERROR } from './cli-terse-error';
export { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';

// Advanced: Custom ArgGroup
export { ICliArgGroup, TCliArgGroupArgs } from './cli-arg-group';

// Advanced: Command tree
export { TCliRoot, ICliTree, ICliLeaf } from './cli-tree';

// Branding
export { CliWordMark } from './cli-word-mark';
