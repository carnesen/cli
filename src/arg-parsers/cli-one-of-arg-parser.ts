import { ICliArgParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';
import { wrapInCurlyBrackets, regularizeText } from '../util';

/**
 * Type of {@linkcode CliOneOfArgParser}'s `options` parameter
 * @typeParam TValues Type of the required property "values" and `parse`'s return value
 */
export type CliOneOfArgParserOptions<TValues extends string[]> = {
  /**
   * Array enumerating the allowed values for this argument
   */
  values: TValues;
  required?: boolean;
  description?: string;
  placeholder?: string;
  hidden?: boolean;
};

/**
 * A factory function for creating number-array-valued arg parsers
 * @param options
 * @returns A number-array-valued arg parser
 */
function CliOneOfArgParser<TValues extends string[]>(
  options: CliOneOfArgParserOptions<TValues> & { defaultValue: TValues },
): ICliArgParser<TValues[number], false>;
function CliOneOfArgParser<TValues extends string[]>(
  options: CliOneOfArgParserOptions<TValues> & { required: true },
): ICliArgParser<TValues[number], true>;
function CliOneOfArgParser<TValues extends string[]>(
  options: CliOneOfArgParserOptions<TValues>,
): ICliArgParser<TValues[number] | undefined, false>;
function CliOneOfArgParser(config: CliOneOfArgParserOptions<string[]>) {
  const valuesString = wrapInCurlyBrackets(config.values.join(', '));
  const {
    required = false,
    description,
    placeholder = '<value>',
    hidden = false,
  } = config;

  const argParser: ICliArgParser<string | undefined> = {
    required,
    placeholder: config.placeholder || '<value>',
    hidden,
    parse(args) {
      if (!args) {
        return undefined;
      }

      if (args.length !== 1) {
        throw new CliUsageError(`Expected ${placeholder} to be one of ${valuesString}`);
      }

      if (!config.values.includes(args[0])) {
        throw new CliUsageError(
          `Invalid argument "${args[0]}". Expected ${placeholder} to be one of ${valuesString}`,
        );
      }
      return args[0];
    },
    description: `${regularizeText(description)}\nAllowed values ${valuesString}`,
  };
  return argParser;
}

export { CliOneOfArgParser };
