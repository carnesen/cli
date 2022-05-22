/** This module is the main entrypoint for the **@carnesen/cli** package */

//
// Command factory
//
import { CCliCommand, CCliCommandOptions } from './c-cli-command';
export { CCliCommand, CCliCommandOptions };
/** @deprecated Use `CCliCommand.create` or `c.command` */
export const CliCommand = CCliCommand.create;
/** @deprecated Use `CCliCommand` */
export type ICliCommand<
	PositionalArgGroup extends CCliArgGroup = CCliArgGroup,
	NamedArgGroups extends {
		[name: string]: CCliArgGroup;
	} = {
		[name: string]: CCliArgGroup;
	},
	DoubleDashArgGroup extends CCliArgGroup = CCliArgGroup,
> = CCliCommand<PositionalArgGroup, NamedArgGroups, DoubleDashArgGroup>;
/** @deprecated Use `CliCommandOptions` */
export type ICliCommandOptions<
	PositionalArgGroup extends CCliArgGroup = CCliArgGroup,
	NamedArgGroups extends {
		[name: string]: CCliArgGroup;
	} = {
		[name: string]: CCliArgGroup;
	},
	DoubleDashArgGroup extends CCliArgGroup = CCliArgGroup,
> = CCliCommandOptions<PositionalArgGroup, NamedArgGroups, DoubleDashArgGroup>;

//
// Command group factory
//
import {
	CCliCommandGroup,
	CCliCommandGroupOptions,
} from './c-cli-command-group';
export { CCliCommandGroup, CCliCommandGroupOptions };
/** @deprecated Use `CCliCommandGroup.create` or `c.commandGroup` */
export const CliCommandGroup = CCliCommandGroup.create;
/** @deprecated Use `CCliCommandGroupOptions` */
export type ICliCommandGroupOptions = CCliCommandGroupOptions;

//
// Command-line interface (CLI) factory
//
import { CCli, CCliOptions } from './c-cli';
export { CCli, CCliOptions };
/** @deprecated Use `CliOptions` instead */
export type ICliOptions = CCliOptions;
/** @deprecated Use `CCli.create` or `c.cli` */
export const Cli = CCli.create;
/** @deprecated Use `CCli` instead */
export type ICli = CCli;

//
// Argument group factories
//
// boolean flag
export { CliFlagArgGroup } from './arg-group-factories/cli-flag-arg-group';
import { CliFlagArgGroupOptions } from './arg-group-factories/cli-flag-arg-group';
export { CliFlagArgGroupOptions };
/** @deprecated Use `CliFlagArgGroupOptions` */
export type ICliFlagArgGroupOptions = CliFlagArgGroupOptions;

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
	CCliDescriptionFunctionInput,
	CCliDescriptionFunction,
} from './c-cli-description';
/** @deprecated Use `CliDescriptionFunctionInput` */
export type ICliDescriptionFunctionInput = CCliDescriptionFunctionInput;
/** @deprecated Use `AnyCliDescription` */
export type TCliDescription = AnyCliDescription;
/** @deprecated Use `CliDescriptionFunction` */
export type TCliDescriptionFunction = CCliDescriptionFunction;
export {
	AnyCliDescription,
	CCliDescriptionFunctionInput as CliDescriptionFunctionInput,
	CCliDescriptionFunction as CliDescriptionFunction,
};

//
// Logging
//
import { CCliLogger } from './c-cli-logger';
/** @deprecated Use `CliLogger` */
export type ICliConsole = CCliLogger;
export { CCliLogger as CliLogger };
export { CCliNoopLogger as CliNoopLogger } from './c-cli-noop-logger';
export { CCliConsoleLogger as CliConsoleLogger } from './c-cli-console-logger';

//
// Isomorphic type mimicking the Node.js global `process`
//
import { CCliProcess } from './c-cli-process';
/** @deprecated Use `CliProcess` */
export type ICliProcess = CCliProcess;
export { CCliProcess as CliProcess };

//
// Text decoration
//
import { CCliColor } from './c-cli-color';
/** @deprecated Use `CliColor` */
export type ICliAnsi = CCliColor;
export { CCliColor as CliColor };
export { CCliNoopColor as CliNoopColor } from './c-cli-noop-color';
import { cCliColorFactory } from './c-cli-color-factory';
/** @deprecated Use `cliColorFactory` */
export const CliAnsi = cCliColorFactory;
export { cCliColorFactory as cliColorFactory };

//
// Error constructors
//
export {
	CCliTerseError as CliTerseError,
	C_CLI_TERSE_ERROR as CLI_TERSE_ERROR,
} from './c-cli-terse-error';
export {
	CCliUsageError as CliUsageError,
	C_CLI_USAGE_ERROR as CLI_USAGE_ERROR,
} from './c-cli-usage-error';

//
// Custom ArgGroup
//
import { CCliArgGroup, CCliArgGroupArgs } from './c-cli-arg-group';
/** @deprecated Use `CliArgGroupArgs` */
export type TCliArgGroupArgs<Required extends boolean> =
	CCliArgGroupArgs<Required>;
/** @deprecated Use `CliArgGroup` */
export type ICliArgGroup<
	Value = unknown,
	Required extends boolean = boolean,
> = CCliArgGroup<Value, Required>;
export { CCliArgGroup as CliArgGroup, CCliArgGroupArgs as CliArgGroupArgs };

//
// Command tree
//
import { CCliRoot, CCliTree, CCliLeaf } from './c-cli-tree';
/** @deprecated Use `CliRoot` */
export type TCliRoot = CCliRoot;
/** @deprecated Use `CliTree` */
export type ICliTree = CCliTree;
/** @deprecated Use `CliLeaf` */
export type ICliLeaf = CCliLeaf;
export { CCliRoot as CliRoot, CCliTree as CliTree, CCliLeaf as CliLeaf };

//
// Branding
//
export { CCliWordMark as CliWordMark } from './c-cli-word-mark';

///
// FOR INTERNAL USE ONLY
//
export { navigateCliTree, NavigateCliTreeResult } from './navigate-cli-tree';
