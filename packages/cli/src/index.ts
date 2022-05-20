/** This module is the main entrypoint for the **@carnesen/cli** package */

//
// Command factory
//
export { CliCommand, ICliCommand, CLI_COMMAND } from './cli-command';
import { CliCommandOptions } from './cli-command';
/** @deprecated Use `CliCommandOptions` */
export type ICliCommandOptions = CliCommandOptions;
export { CliCommandOptions };

//
// Command-line interface (CLI) factory
//
import { CliOptions } from './cli-options';
/** @deprecated Use `CliOptions` instead */
export type ICliOptions = CliOptions;
export { CliOptions };

import { CCli } from './c-cli';
export const Cli = CCli.create;
/** @deprecated Use `CCli` instead */
export type ICli = CCli;

//
// Command group factory
//
export {
	cliCommandGroupFactory as CliCommandGroup,
	ICliCommandGroup,
	CliCommandGroupOptions as ICliCommandGroupOptions,
	CLI_COMMAND_GROUP,
} from './cli-command-group';

//
// Argument group factories
//

// boolean flag
export { CliFlagArgGroup } from './arg-group-factories/cli-flag-arg-group';
import { CliFlagArgGroupOptions } from './arg-group-factories/cli-flag-arg-group';
/** @deprecated Use `CliFlagArgGroupOptions` */
export type ICliFlagArgGroupOptions = CliFlagArgGroupOptions;
export { CliFlagArgGroupOptions };

// JSON
export { CliJsonArgGroup } from './arg-group-factories/cli-json-arg-group';
import { CliJsonArgGroupOptions } from './arg-group-factories/cli-json-arg-group';
/** @deprecated Use `CliJsonArgGroupOptions` */
export type ICliJsonArgGroupOptions = CliJsonArgGroupOptions;
export { CliJsonArgGroupOptions };

// number
export { CliNumberArgGroup } from './arg-group-factories/cli-number-arg-group';
import { CliNumberArgGroupOptions } from './arg-group-factories/cli-number-arg-group';
/** @deprecated Use `CliNumberArgGroupOptions` */
export type ICliNumberArgGroupOptions = CliNumberArgGroupOptions;
export { CliNumberArgGroupOptions };

// number array
export { CliNumberArrayArgGroup } from './arg-group-factories/cli-number-array-arg-group';
import { CliNumberArrayArgGroupOptions } from './arg-group-factories/cli-number-array-arg-group';
/** @deprecated Use `CliNumberArrayArgGroupOptions` */
export type ICliNumberArrayArgGroupOptions = CliNumberArrayArgGroupOptions;
export { CliNumberArrayArgGroupOptions };

// string choice (literal union)
export { CliStringChoiceArgGroup } from './arg-group-factories/cli-string-choice-arg-group';
import {
	AnyCliStringChoices,
	CliStringChoiceArgGroupOptions,
} from './arg-group-factories/cli-string-choice-arg-group';
/** @deprecated Use `CliStringChoiceArgGroupOptions` */
export type ICliStringChoiceArgGroupOptions<
	Choices extends AnyCliStringChoices,
> = CliStringChoiceArgGroupOptions<Choices>;
export { AnyCliStringChoices, CliStringChoiceArgGroupOptions };

// string
export { CliStringArgGroup } from './arg-group-factories/cli-string-arg-group';
import { CliStringArgGroupOptions } from './arg-group-factories/cli-string-arg-group';
/** @deprecated Use `CliStringArgGroupOptions` */
export type ICliStringArgGroupOptions = CliStringArgGroupOptions;
export { CliStringArgGroupOptions };

// string array
export { CliStringArrayArgGroup } from './arg-group-factories/cli-string-array-arg-group';
import { CliStringArrayArgGroupOptions } from './arg-group-factories/cli-string-array-arg-group';
/** @deprecated Use `CliStringArrayArgGroupOptions` */
export type ICliStringArrayArgGroupOptions = CliStringArrayArgGroupOptions;
export { CliStringArrayArgGroupOptions };

//
// The rest of the exports in this module are "advanced" features
//

//
// Description functions
//
import {
	AnyCliDescription,
	CliDescriptionFunctionInput,
	CliDescriptionFunction,
} from './cli-description';
/** @deprecated Use `CliDescriptionFunctionInput` */
export type ICliDescriptionFunctionInput = CliDescriptionFunctionInput;
/** @deprecated Use `AnyCliDescription` */
export type TCliDescription = AnyCliDescription;
/** @deprecated Use `CliDescriptionFunction` */
export type TCliDescriptionFunction = CliDescriptionFunction;
export {
	AnyCliDescription,
	CliDescriptionFunctionInput,
	CliDescriptionFunction,
};

//
// Logging
//
import { CliLogger } from './cli-logger';
/** @deprecated Use `CliLogger` */
export type ICliConsole = CliLogger;
export { CliLogger };
export { CliNoopLogger } from './cli-noop-logger';
export { CliConsoleLogger } from './cli-console-logger';

//
// Isomorphic type mimicking the Node.js global `process`
//
import { CliProcess } from './cli-process';
/** @deprecated Use `CliProcess` */
export type ICliProcess = CliProcess;
export { CliProcess };

//
// Text decoration
//
import { CliColor } from './cli-color';
/** @deprecated Use `CliColor` */
export type ICliAnsi = CliColor;
export { CliColor };
import { cliColorFactory } from './cli-color-factory';
/** @deprecated Use `cliColorFactory` */
export const CliAnsi = cliColorFactory;
export { cliColorFactory };

//
// Error constructors
//
export { CliTerseError, CLI_TERSE_ERROR } from './cli-terse-error';
export { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';

//
// Custom ArgGroup
//
import { CliArgGroup, CliArgGroupArgs } from './cli-arg-group';
/** @deprecated Use `CliArgGroupArgs` */
export type TCliArgGroupArgs<Required extends boolean> =
	CliArgGroupArgs<Required>;
/** @deprecated Use `CliArgGroup` */
export type ICliArgGroup<
	Value = unknown,
	Required extends boolean = boolean,
> = CliArgGroup<Value, Required>;
export { CliArgGroup, CliArgGroupArgs };

//
// Command tree
//
import { CliRoot, CliTree, CliLeaf } from './cli-tree';
/** @deprecated Use `CliRoot` */
export type TCliRoot = CliRoot;
/** @deprecated Use `CliTree` */
export type ICliTree = CliTree;
/** @deprecated Use `CliLeaf` */
export type ICliLeaf = CliLeaf;
export { CliRoot, CliTree, CliLeaf };

//
// Branding
//
export { CliWordMark } from './cli-word-mark';
