/** The exports of this module are exported in the main index as the `c`
 * namespace object */

import { CCliFlagArgGroup } from './arg-group-factories/c-cli-flag-arg-group';
import { CCliJsonArgGroup } from './arg-group-factories/c-cli-json-arg-group';
import { CCliNumberArgGroup } from './arg-group-factories/c-cli-number-arg-group';
import { CCliNumberArrayArgGroup } from './arg-group-factories/c-cli-number-array-arg-group';
import { CCliStringArgGroup } from './arg-group-factories/c-cli-string-arg-group';
import { CCliStringArrayArgGroup } from './arg-group-factories/c-cli-string-array-arg-group';
import { CCliStringChoiceArgGroup } from './arg-group-factories/c-cli-string-choice-arg-group';
import { CCli } from './c-cli';
import { CCliCommand } from './c-cli-command';
import { CCliCommandGroup } from './c-cli-command-group';

/** Factory for creating a `@carnesen/cli` command-line interface
 * @param root The "root" command or (most often) command group for the CLI
 * @param options Advanced options for configuring the CLI */
export const cli = CCli.create;

export const command = CCliCommand.create;

export const commandGroup = CCliCommandGroup.create;

//
// Argument group factories
//

/** A factory for boolean-valued {@link CliArgGroup}'s
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 * @throws {@link CCliUsageError} */
export const flag = CCliFlagArgGroup.create;

/** A factory for argument groups that `JSON.parse`
 * @example
 * Suppose our CLI's positionalArgGroup is a `ccli.json`. Here's how that
 * behaves:
 * ```plaintext
 * $ cli '{"foo":true}' // named value receives object `{ foo: true }`
 * $ cli                // usage error
 * $ cli '""' '""'      // usage error
 * $ cli foo            // error parsing JSON
 * ```
 * @throws {@link CliUsageError} */
export const json = CCliJsonArgGroup.create;

/** A factory for `number`-valued argument groups */
export const number = CCliNumberArgGroup.create;

/** A factory for `number[]`-valued argument groups */
export const numberArray = CCliNumberArrayArgGroup.create;

/** A factory for `string`-valued argument groups */
export const string = CCliStringArgGroup.create;

/** A factory for `number[]`-valued argument groups */
export const stringArray = CCliStringArrayArgGroup.create;

/** A factory for command argument groups whose value is one of the provided
 * string choices */
export const stringChoice = CCliStringChoiceArgGroup.create;
