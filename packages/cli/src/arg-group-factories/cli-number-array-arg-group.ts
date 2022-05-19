import { CliArgGroup } from '../cli-arg-group';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliNumberArrayArgGroup`]] */
export type CliNumberArrayArgGroupOptions = {
	/** See [[`CliArgGroup.description`]] */
	description?: string;

	/** See [[`CliArgGroup.required`]] */
	required?: boolean;

	/** See [[`CliArgGroup.placeholder`]] defaulting to "\<num0\> [...]" */
	placeholder?: string;

	/** See [[`CliArgGroup.hidden`]] */
	hidden?: boolean;
};

/** A factory for required `number[]`-valued [[`CliArgGroup`]]s */
function CliNumberArrayArgGroup(
	options: CliNumberArrayArgGroupOptions & { required: true },
): CliArgGroup<number[], true>;

/** A factory for optional `number[] | undefined`-valued [[`CliArgGroup`]]s */
function CliNumberArrayArgGroup(
	options?: CliNumberArrayArgGroupOptions,
): CliArgGroup<number[] | undefined, boolean>;

// Implementation
function CliNumberArrayArgGroup(
	options: CliNumberArrayArgGroupOptions = {},
): CliArgGroup<number[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num0> [...]',
		hidden = false,
	} = options;
	const argGroup: CliArgGroup<number[] | undefined> = {
		required,
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length === 0) {
				throw new CliUsageError(
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
