import { CCliArgGroup } from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CliStringArrayArgGroup} */
export type CliStringArrayArgGroupOptions = {
	/** See {@link CliArgGroup.description} */
	description?: string;

	/** See {@link CliArgGroup.required} */
	required?: boolean;

	/** See {@link CliArgGroup.required} */
	hidden?: boolean;

	/** See {@link CliArgGroup.placeholder} defaulting to "\<str0\> [...]" */
	placeholder?: string;
};

/** A factory for required `string[]`-valued {@link CliArgGroup}s */
function CliStringArrayArgGroup(
	options: CliStringArrayArgGroupOptions & { required: true },
): CCliArgGroup<string[], true>;

/** A factory for optional `string[] | undefined`-valued {@link CliArgGroup}s */
function CliStringArrayArgGroup(
	options?: CliStringArrayArgGroupOptions,
): CCliArgGroup<string[] | undefined, boolean>;

// Implementation
function CliStringArrayArgGroup(
	options: CliStringArrayArgGroupOptions = {},
): CCliArgGroup<string[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str0> [...]',
		hidden = false,
	} = options;
	const argGroup: CCliArgGroup<string[] | undefined> = {
		required,
		hidden,
		placeholder,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length === 0) {
				throw new CCliUsageError(`Expected one or more values ${placeholder}`);
			}

			return args;
		},
		description,
	};
	return argGroup;
}

export { CliStringArrayArgGroup };
