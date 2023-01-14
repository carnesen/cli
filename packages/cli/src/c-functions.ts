/** The exports of this module are exported in the main index as the `c`
 * namespace object */

import { CCliBigintArgGroup } from './arg-groups/c-cli-bigint-arg-group';
import { CCliBigintArrayArgGroup } from './arg-groups/c-cli-bigint-array-arg-group';
import { CCliFlagArgGroup } from './arg-groups/c-cli-flag-arg-group';
import { CCliJsonArgGroup } from './arg-groups/c-cli-json-arg-group';
import { CCliNumberArgGroup } from './arg-groups/c-cli-number-arg-group';
import { CCliNumberArrayArgGroup } from './arg-groups/c-cli-number-array-arg-group';
import { CCliStringArgGroup } from './arg-groups/c-cli-string-arg-group';
import { CCliStringArrayArgGroup } from './arg-groups/c-cli-string-array-arg-group';
import { CCliStringChoiceArgGroup } from './arg-groups/c-cli-string-choice-arg-group';
import { CCli } from './c-cli';
import { CCliCommand } from './c-cli-command';
import { CCliCommandGroup } from './c-cli-command-group';

/** {@link CCli} factory function ({@link CCli.create}) */
export const cli = CCli.create;

/** {@link CCliCommand} factory function ({@link CCliCommand.create}) */
export const command = CCliCommand.create;

/** {@link CCliCommandGroup} factory function ({@link CCliCommandGroup.create}) */
export const commandGroup = CCliCommandGroup.create;

//
// Argument group factories
//

/** {@link CCliBigintArgGroup} factory function ({@link CCliBigintArgGroup.create}) */
export const bigint = CCliBigintArgGroup.create;

/** {@link CCliBigintArrayArgGroup} factory function ({@link CCliBigintArrayArgGroup.create}) */
export const bigintArray = CCliBigintArrayArgGroup.create;

/** {@link CCliFlagArgGroup} factory function ({@link CCliFlagArgGroup.create}) */
export const flag = CCliFlagArgGroup.create;

/** {@link CCliJsonArgGroup} factory function ({@link CCliJsonArgGroup.create}) */
export const json = CCliJsonArgGroup.create;

/** {@link CCliNumberArgGroup} factory function ({@link CCliNumberArgGroup.create}) */
export const number = CCliNumberArgGroup.create;

/** {@link CCliNumberArrayArgGroup} factory function ({@link CCliNumberArrayArgGroup.create}) */
export const numberArray = CCliNumberArrayArgGroup.create;

/** {@link CCliStringArgGroup} factory function ({@link CCliStringArgGroup.create}) */
export const string = CCliStringArgGroup.create;

/** {@link CCliStringArrayArgGroup} factory function ({@link CCliStringArrayArgGroup.create}) */
export const stringArray = CCliStringArrayArgGroup.create;

/** {@link CCliStringChoiceArgGroup} factory function ({@link CCliStringChoiceArgGroup.create}) */
export const stringChoice = CCliStringChoiceArgGroup.create;
