import { ICliParser } from '../cli-parser';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliNumberArrayValuedParser`]] */
export interface ICliNumberArrayValuedParserOptions {
	/** [[`ICliParser.description`]] */
	description?: string;

	/** [[`ICliParser.required`]] */
	required?: boolean;

	/** [[`ICliParser.placeholder`]] defaulting to "\<num0\> [...]" */
	placeholder?: string;

	/** [[`ICliParser.hidden`]] */
	hidden?: boolean;
}

/** A factory for required `number[]`-valued [[`ICliParser`]]s */
function CliNumberArrayValuedParser(
	options: ICliNumberArrayValuedParserOptions & { required: true },
): ICliParser<number[], true>;

/** A factory for optional `number[] | undefined`-valued [[`ICliParser`]]s */
function CliNumberArrayValuedParser(
	options?: ICliNumberArrayValuedParserOptions,
): ICliParser<number[] | undefined, boolean>;

// Implementation
function CliNumberArrayValuedParser(
	options: ICliNumberArrayValuedParserOptions = {},
): ICliParser<number[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num0> [...]',
		hidden = false,
	} = options;
	const parser: ICliParser<number[] | undefined> = {
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
	return parser;
}

export { CliNumberArrayValuedParser };
