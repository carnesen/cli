import { CCliArgGroup } from '../c-cli-arg-group';
import { convertToNumber } from '../util';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CliNumberArrayArgGroup} a.k.a `ccli.numberArray` */
export type CliNumberArrayArgGroupOptions = {
	/** See {@link CliArgGroup.description} */
	description?: string;

	/** See {@link CliArgGroup.required} */
	required?: boolean;

	/** See {@link CliArgGroup.placeholder} defaulting to "\<num0\> [...]" */
	placeholder?: string;

	/** See {@link CliArgGroup.hidden} */
	hidden?: boolean;
};

/** A factory for required `number[]`-valued {@link CliArgGroup}s */
function CliNumberArrayArgGroup(
	options: CliNumberArrayArgGroupOptions & { required: true },
): CCliArgGroup<number[], true>;

/** A factory for optional `number[] | undefined`-valued {@link CliArgGroup}s */
function CliNumberArrayArgGroup(
	options?: CliNumberArrayArgGroupOptions,
): CCliArgGroup<number[] | undefined, boolean>;

// Implementation
function CliNumberArrayArgGroup(
	options: CliNumberArrayArgGroupOptions = {},
): CCliArgGroup<number[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num0> [...]',
		hidden = false,
	} = options;
	const argGroup: CCliArgGroup<number[] | undefined> = {
		required,
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length === 0) {
				throw new CCliUsageError(
					`Expected one or more arguments ${placeholder}`,
				);
			}

			return args.map(convertToNumber);
		},
		description,
		placeholder,
	};
	return argGroup;
}

export { CliNumberArrayArgGroup };
