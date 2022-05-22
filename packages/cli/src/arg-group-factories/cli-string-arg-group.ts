import { CCliArgGroup } from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CliStringArgGroup} */
export type CliStringArgGroupOptions = {
	/** See {@link CliArgGroup.required} */
	required?: boolean;

	/** See {@link CliArgGroup.description} */
	description?: string;

	/** See {@link CliArgGroup.hidden} */
	hidden?: boolean;

	/** See {@link CliArgGroup.placeholder} defaulting to "\<str\>" */
	placeholder?: string;
};

/** A factory for required `string`-valued {@link CliArgGroup}s */
function CliStringArgGroup(
	options: CliStringArgGroupOptions & { required: true },
): CCliArgGroup<string, true>;

/** A factory for optional `string | undefined`-valued {@link CliArgGroup}s */
function CliStringArgGroup(
	options?: CliStringArgGroupOptions,
): CCliArgGroup<string | undefined, false>;

// Implementation
function CliStringArgGroup(
	options: CliStringArgGroupOptions = {},
): CCliArgGroup<string | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str>',
		hidden = false,
	} = options;
	const argGroup: CCliArgGroup<string | undefined> = {
		hidden,
		placeholder,
		required,
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

			return args[0];
		},
		description,
	};
	return argGroup;
}

export { CliStringArgGroup };
