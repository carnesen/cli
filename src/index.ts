// Command factories
export {
	CliBranch,
	ICliBranch,
	ICliBranchOptions,
	CLI_BRANCH,
} from './cli-branch';
export {
	CliCommand,
	ICliCommand,
	ICliCommandOptions,
	CLI_COMMAND,
} from './cli-command';

// ICliArgGroup factories
export {
	CliBooleanArgGroup,
	ICliBooleanArgGroupOptions,
} from './arg-group/cli-boolean-arg-group';
export {
	CliJsonArgGroup,
	ICliJsonArgGroupOptions,
} from './arg-group/cli-json-arg-group';
export {
	CliNumberArgGroup,
	ICliNumberArgGroupOptions,
} from './arg-group/cli-number-arg-group';
export {
	CliNumberArrayArgGroup,
	ICliNumberArrayArgGroupOptions,
} from './arg-group/cli-number-array-arg-group';
export {
	CliOneOfArgGroup,
	ICliOneOfArgGroupOptions,
} from './arg-group/cli-one-of-arg-group';
export {
	CliStringArgGroup,
	ICliStringArgGroupOptions,
} from './arg-group/cli-string-arg-group';
export {
	CliStringArrayArgGroup,
	ICliStringArrayArgGroupOptions,
} from './arg-group/cli-string-array-arg-group';

// Command-line interface runners
export { runCliAndExit, IRunCliAndExitOptions } from './run-cli-and-exit';
export { Cli, ICli } from './cli';

// Error constructors
export { CliTerseError, CLI_TERSE_ERROR } from './cli-terse-error';
export { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';

// For custom argGroups
export { ICliArgGroup, TCliArgGroupArgs } from './cli-arg-group';
