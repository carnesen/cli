import { CCliArgGroup } from '../c-cli-arg-group';
import { convertToNumber } from '../util';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CliNumberArgGroup} */
export type CliNumberArgGroupOptions = {
	/** See {@link CliArgGroup.required} */
	required?: boolean;

	/** See {@link CliArgGroup.description} */
	description?: string;

	/** See {@link CliArgGroup.placeholder} defaulting to "\<num\>" */
	placeholder?: string;

	/** See {@link CliArgGroup.description} */
	hidden?: boolean;
};

/** A factory for `number`-valued required {@link CliArgGroup}s */
function CliNumberArgGroup(
	options: CliNumberArgGroupOptions & { required: true },
): CCliArgGroup<number, true>;

/** A factory for `number | undefined`-valued optional {@link CliArgGroup}s */
function CliNumberArgGroup(
	options?: CliNumberArgGroupOptions,
): CCliArgGroup<number | undefined, boolean>;

// Implementation
function CliNumberArgGroup(
	config: CliNumberArgGroupOptions = {},
): CCliArgGroup<number | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num>',
		hidden = false,
	} = config;
	const argGroup: CCliArgGroup<number | undefined> = {
		required,
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length > 1) {
				throw new CCliUsageError(`Expected just one ${placeholder}`);
			}

			if (args.length === 0) {
				throw new CCliUsageError(`Expected a ${placeholder}`);
			}

			return convertToNumber(args[0]);
		},
		description,
		placeholder,
	};
	return argGroup;
}

export { CliNumberArgGroup };
