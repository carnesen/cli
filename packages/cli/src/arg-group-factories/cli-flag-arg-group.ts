import { CliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';
import { AnyCliDescription } from '../cli-description';

/**
 * Options for [[`CliFlagArgGroup`]]
 */
export type CliFlagArgGroupOptions = {
	/** See [[`CliArgGroup.description`]] */
	description?: AnyCliDescription;
	/** See [[`CliArgGroup.hidden`]] */
	hidden?: boolean;
};

/** A factory for boolean-valued [[`CliArgGroup`]]'s
 *
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 * @throws [[`CliUsageError`]] */
export function CliFlagArgGroup(
	options: CliFlagArgGroupOptions = {},
): CliArgGroup<boolean, false> {
	const { description, hidden = false } = options;
	const argGroup: CliArgGroup<boolean, false> = {
		placeholder: '',
		required: false,
		hidden,
		parse(args) {
			if (!args) {
				return false;
			}
			if (args.length > 0) {
				throw new CliUsageError(`Unexpected argument "${args[0]}"`);
			}
			return true;
		},
		description,
	};
	return argGroup;
}
