/** This module is the main entrypoint for the **@carnesen/cli** package */

import * as c from './c';
export { c };

//
// Command factory
//
import { CCliCommand, CCliCommandOptions } from './c-cli-command';
export { CCliCommand, CCliCommandOptions };
/** @deprecated Use {@link c.command} or {@link CCliCommand.create} */
export const CliCommand = CCliCommand.create;

//
// Command group factory
//
import {
	CCliCommandGroup,
	CCliCommandGroupOptions,
} from './c-cli-command-group';
export { CCliCommandGroup, CCliCommandGroupOptions };
/** @deprecated Use {@link c.commandGroup} or {@link CCliCommandGroup.create} */
export const CliCommandGroup = CCliCommandGroup.create;

//
// Command-line interface (CLI) factory
//
import { CCli, CCliOptions } from './c-cli';
export { CCli, CCliOptions };
/** @deprecated Use {@link c.cli} or {@link CCli.create} */
export const Cli = CCli.create;

//
// Argument group factories
//
// boolean flag
import {
	CCliFlagArgGroup,
	CCliFlagArgGroupOptions,
} from './arg-group-factories/c-cli-flag-arg-group';
export { CCliFlagArgGroup, CCliFlagArgGroupOptions };
/** @deprecated Use {@link c.flag} or {@link CCliFlagArgGroup.create} */
export const CliFlagArgGroup = CCliFlagArgGroup.create;

// JSON
import {
	CCliJsonArgGroup,
	CCliJsonArgGroupOptions,
} from './arg-group-factories/c-cli-json-arg-group';
export { CCliJsonArgGroup, CCliJsonArgGroupOptions };
/** @deprecated Use {@link c.json} or {@link CCliJsonArgGroup.create} */
export const CliJsonArgGroup = CCliJsonArgGroup.create;

// number
import {
	CCliNumberArgGroup,
	CCliNumberArgGroupOptions,
} from './arg-group-factories/c-cli-number-arg-group';
export { CCliNumberArgGroup, CCliNumberArgGroupOptions };
/** @deprecated Use {@link c.number} or {@link CCliNumberArgGroup.create} */
export const CliNumberArgGroup = CCliNumberArgGroup.create;

// number array
import {
	CCliNumberArrayArgGroup,
	CCliNumberArrayArgGroupOptions,
} from './arg-group-factories/c-cli-number-array-arg-group';
export { CCliNumberArrayArgGroup, CCliNumberArrayArgGroupOptions };
/** @deprecated Use {@link c.numberArray} or {@link CCliNumberArrayArgGroup.create} */
export const CliNumberArrayArgGroup = CCliNumberArrayArgGroup.create;

// string
import {
	CCliStringArgGroup,
	CCliStringArgGroupOptions,
} from './arg-group-factories/c-cli-string-arg-group';
export { CCliStringArgGroup, CCliStringArgGroupOptions };
/** @deprecated Use {@link c.string} or {@link CCliStringArgGroup.create} */
export const CliStringArgGroup = CCliStringArgGroup.create;

// string array
import {
	CCliStringArrayArgGroup,
	CCliStringArrayArgGroupOptions,
} from './arg-group-factories/c-cli-string-array-arg-group';
export { CCliStringArrayArgGroup, CCliStringArrayArgGroupOptions };
/** @deprecated Use {@link c.stringArray} or {@link CCliStringArrayArgGroup.create} */
export const CliStringArrayArgGroup = CCliStringArrayArgGroup.create;

// string choice (literal union)
import {
	CCliStringChoiceArgGroup,
	CCliStringChoiceArgGroupOptions,
} from './arg-group-factories/c-cli-string-choice-arg-group';
export { CCliStringChoiceArgGroup, CCliStringChoiceArgGroupOptions };
/** @deprecated Use {@link c.stringChoice} or {@link CCliStringChoiceArgGroup.create} */
export const CliStringChoiceArgGroup = CCliStringChoiceArgGroup.create;

//
// The rest of the exports in this module support "advanced" features
//

//
// Description functions
//
import {
	CCliAnyDescription,
	CCliDescriptionFunctionInput,
	CCliDescriptionFunction,
} from './c-cli-description';

export {
	CCliAnyDescription,
	CCliDescriptionFunctionInput,
	CCliDescriptionFunction,
};

//
// Logging
//
export { CCliLogger } from './c-cli-logger';
export { CCliNoopLogger } from './c-cli-noop-logger';
export { CCliConsoleLogger } from './c-cli-console-logger';

//
// Isomorphic type mimicking the Node.js global `process`
//
export { CCliProcess } from './c-cli-process';

//
// Text decoration
//
export { CCliColor } from './c-cli-color';
export { CCliNoopColor } from './c-cli-noop-color';
export { cCliColorFactory } from './c-cli-color-factory';

//
// Error constructors
//
export { CCliTerseError } from './c-cli-terse-error';
export { CCliUsageError } from './c-cli-usage-error';

//
// Custom ArgGroup
//
export {
	CCliAbstractArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from './c-cli-abstract-arg-group';

//
// Command tree
//
export { CCliRoot, CCliTree, CCliLeaf } from './c-cli-tree';

//
// Branding
//
export { CCliWordMark } from './c-cli-word-mark';

///
// FOR INTERNAL USE ONLY
//
export { navigateCCliTree, NavigateCCliTreeResult } from './navigate-cli-tree';
