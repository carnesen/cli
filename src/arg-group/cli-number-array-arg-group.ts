import { ICliArgGroup } from '../cli-arg-group';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliNumberArrayArgGroup`]] */
export interface ICliNumberArrayArgGroupOptions {
	/** [[`ICliArgGroup.description`]] */
	description?: string;

	/** [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** [[`ICliArgGroup.placeholder`]] defaulting to "\<num0\> [...]" */
	placeholder?: string;

	/** [[`ICliArgGroup.hidden`]] */
	hidden?: boolean;
}

/** A factory for required `number[]`-valued [[`ICliArgGroup`]]s */
function CliNumberArrayArgGroup(
	options: ICliNumberArrayArgGroupOptions & { required: true },
): ICliArgGroup<number[], true>;

/** A factory for optional `number[] | undefined`-valued [[`ICliArgGroup`]]s */
function CliNumberArrayArgGroup(
	options?: ICliNumberArrayArgGroupOptions,
): ICliArgGroup<number[] | undefined, boolean>;

// Implementation
function CliNumberArrayArgGroup(
	options: ICliNumberArrayArgGroupOptions = {},
): ICliArgGroup<number[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num0> [...]',
		hidden = false,
	} = options;
	const argGroup: ICliArgGroup<number[] | undefined> = {
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
