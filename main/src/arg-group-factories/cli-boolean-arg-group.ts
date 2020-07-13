import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/**
 * Options for [[`CliBooleanArgGroup`]]
 */
export interface ICliBooleanArgGroupOptions {
	/** See [[`ICliArgGroup.description`]] */
	description?: string;
	/** See [[`ICliArgGroup.hidden`]] */
	hidden?: boolean;
}

/**
 * A factory for boolean-valued [[`ICliArgGroup`]]'s
 *
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 *
 * @throws [[`CliUsageError`]]
 */
export function CliBooleanArgGroup(
	options: ICliBooleanArgGroupOptions = {},
): ICliArgGroup<boolean, false> {
	const { description, hidden = false } = options;
	const argGroup: ICliArgGroup<boolean, false> = {
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
