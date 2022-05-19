/** The exports of this module are exported in the main index as the "ccli"
 * namespace object */

import { CliFlagArgGroup } from './arg-group-factories/cli-flag-arg-group';

/** A factory for boolean-valued [[`CliArgGroup`]]'s
 *
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 * @throws [[`CliUsageError`]] */
export const flag = CliFlagArgGroup;
