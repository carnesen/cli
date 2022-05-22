import { CCliArgGroup } from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';
import { AnyCliDescription } from '../c-cli-description';

/**
 * Options for {@link CliFlagArgGroup}
 */
export type CliFlagArgGroupOptions = {
	/** See {@link CliArgGroup.description} */
	description?: AnyCliDescription;
	/** See {@link CliArgGroup.hidden} */
	hidden?: boolean;
};

/** A factory for boolean-valued {@link CliArgGroup}'s
 *
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 * @throws {@link CliUsageError} */
export function CliFlagArgGroup(
	options: CliFlagArgGroupOptions = {},
): CCliArgGroup<boolean, false> {
	const { description, hidden = false } = options;
	const argGroup: CCliArgGroup<boolean, false> = {
		placeholder: '',
		required: false,
		hidden,
		parse(args) {
			if (!args) {
				return false;
			}
			if (args.length > 0) {
				throw new CCliUsageError(`Unexpected argument "${args[0]}"`);
			}
			return true;
		},
		description,
	};
	return argGroup;
}
