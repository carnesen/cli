// Command-line interface runner
export { Cli } from './cli';
export { ICli, ICliOptions } from './cli-interface';

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
	CliBooleanArgGroup,
	ICliBooleanArgGroupOptions,
} from './arg-group-factories/cli-boolean-arg-group';
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
	CliOneOfArgGroup,
	ICliOneOfArgGroupOptions,
} from './arg-group-factories/cli-one-of-arg-group';
export {
	CliStringArgGroup,
	ICliStringArgGroupOptions,
} from './arg-group-factories/cli-string-arg-group';
export {
	CliStringArrayArgGroup,
	ICliStringArrayArgGroupOptions,
} from './arg-group-factories/cli-string-array-arg-group';

// Advanced: Universal console interface
export { ICliConsole } from './cli-console';

// Advanced: Universal process interface
export { ICliProcess } from './cli-process';

// Advanced: Error constructors
export { CliTerseError, CLI_TERSE_ERROR } from './cli-terse-error';
export { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';

// Advanced: Custom ArgGroup
export { ICliArgGroup, TCliArgGroupArgs } from './cli-arg-group';

// Advanced: Command tree
export { TCliRoot, ICliTree, ICliLeaf } from './cli-tree';
