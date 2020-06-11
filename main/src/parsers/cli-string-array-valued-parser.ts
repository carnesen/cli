import { ICliParser } from '../cli-parser';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliStringArrayValuedParser`]] */
export interface ICliStringArrayValuedParserOptions {
	/** [[`ICliParser.description`]] */
	description?: string;

	/** [[`ICliParser.required`]] */
	required?: boolean;

	/** [[`ICliParser.required`]] */
	hidden?: boolean;

	/** [[`ICliParser.placeholder`]] defaulting to "\<str0\> [...]" */
	placeholder?: string;
}

/** A factory for required `string[]`-valued [[`ICliParser`]]s */
function CliStringArrayValuedParser(
	options: ICliStringArrayValuedParserOptions & { required: true },
): ICliParser<string[], true>;

/** A factory for optional `string[] | undefined`-valued [[`ICliParser`]]s */
function CliStringArrayValuedParser(
	options?: ICliStringArrayValuedParserOptions,
): ICliParser<string[] | undefined, boolean>;

// Implementation
function CliStringArrayValuedParser(
	options: ICliStringArrayValuedParserOptions = {},
): ICliParser<string[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str0> [...]',
		hidden = false,
	} = options;
	const parser: ICliParser<string[] | undefined> = {
		required,
		hidden,
		placeholder,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length === 0) {
				throw new CliUsageError(`Expected one or more values ${placeholder}`);
			}

			return args;
		},
		description,
	};
	return parser;
}

export { CliStringArrayValuedParser };
