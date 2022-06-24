/** This module is the main entrypoint for the **@carnesen/cli** package */

// The `c` namespace module has convenience methods for creating a command-line
// interface with just a single import from this package.
import * as c from './c';
export { c };

//
// Command factory
//
export { CCliCommand, CCliCommandOptions } from './c-cli-command';

//
// Command group factory
//
export {
	CCliCommandGroup,
	CCliCommandGroupOptions,
	CCliSubcommand,
} from './c-cli-command-group';

//
// Command-line interface (CLI) factory
//
export { CCli, CCliOptions } from './c-cli';

//
// Argument group factories
//
// boolean flag
export {
	CCliFlagArgGroup,
	CCliFlagArgGroupOptions,
} from './arg-groups/c-cli-flag-arg-group';

// JSON
export {
	CCliJsonArgGroup,
	CCliJsonArgGroupOptions,
} from './arg-groups/c-cli-json-arg-group';

// number
export {
	CCliNumberArgGroup,
	CCliNumberArgGroupOptions,
} from './arg-groups/c-cli-number-arg-group';

// number array
export {
	CCliNumberArrayArgGroup,
	CCliNumberArrayArgGroupOptions,
} from './arg-groups/c-cli-number-array-arg-group';

// string
export {
	CCliStringArgGroup,
	CCliStringArgGroupOptions,
} from './arg-groups/c-cli-string-arg-group';

// string array
export {
	CCliStringArrayArgGroup,
	CCliStringArrayArgGroupOptions,
} from './arg-groups/c-cli-string-array-arg-group';

// string choice (literal union)
export {
	CCliStringChoiceArgGroup,
	CCliStringChoiceArgGroupOptions,
} from './arg-groups/c-cli-string-choice-arg-group';

//
// The rest of the exports in this module support "advanced" features
//

//
// Description functions
//
import {
	renderCCliDescription,
	RenderCCliDescriptionOptions,
	CCliDescriptionFunction,
} from './c-cli-description';

export {
	renderCCliDescription,
	RenderCCliDescriptionOptions,
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
export { CCliAnsiColor } from './c-cli-ansi-color';
export { CCliColor } from './c-cli-color';
export { CCliNoopColor } from './c-cli-noop-color';
export { cCliColorFactory } from './c-cli-color-factory';

//
// Error constructors
//
export { CCliTerseError } from './c-cli-terse-error';
export { CCliUsageError } from './c-cli-usage-error';

//
// Custom argument group
//
export {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from './c-cli-arg-group';

//
// FOR INTERNAL USE ONLY
//
export { navigateCCliTree, NavigateCCliTreeResult } from './navigate-cli-tree';
export { CCliWordMark } from './c-cli-word-mark';
export { CCliRoot, CCliTree, CCliLeaf } from './c-cli-tree';
