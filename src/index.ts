// Command-line interface
export { Cli, ICli } from './cli';

// Command-line interface runner
export { runCliAndExit, IRunCliAndExitOptions } from './run-cli-and-exit';

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

// Advanced: Error constructors
export { CliTerseError, CLI_TERSE_ERROR } from './cli-terse-error';
export { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';

// Advanced: Custom ArgGroup
export { ICliArgGroup, TCliArgGroupArgs } from './cli-arg-group';

// Advanced: Command tree
export { TCliRoot, ICliNode, ICliLeaf } from './cli-tree';
