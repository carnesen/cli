import { ICliParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';
import { wrapInCurlyBrackets, regularizeText } from '../util';

/**
 * Options for {@linkcode CliOneOfValuedParser}
 * @typeParam TValues Type of the "values" option
 */
export type CliOneOfValuedParserOptions<TValues extends string[]> = {
  /** Allowed values for this argument. For strict typing do e.g. `['foo' as const]` */
  values: TValues;

  /** {@linkcode ICliParser.required} */
  required?: boolean;

  /** {@linkcode ICliParser.description} with "Allowed values: ..." appended automatically
   * */
  description?: string;

  /** {@linkcode ICliParser.placeholder} defaulting to "\<value\>" */
  placeholder?: string;

  /** {@linkcode ICliParser.hidden} */
  hidden?: boolean;
};

/**
 * A factory for required {@linkcode ICliParser}s whose value is one of the values
 * provided
 * @typeParam TValues Type of the provided values
 * */
function CliOneOfValuedParser<TValues extends string[]>(
  options: CliOneOfValuedParserOptions<TValues> & { required: true },
): ICliParser<TValues[number], true>;

/**
 * A factory for optional {@linkcode ICliParser}s whose value is one of the values
 * provided
 * @typeParam TValues Type of the provided values
 * */
function CliOneOfValuedParser<TValues extends string[]>(
  options: CliOneOfValuedParserOptions<TValues>,
): ICliParser<TValues[number] | undefined, false>;

// Implementation
function CliOneOfValuedParser(config: CliOneOfValuedParserOptions<string[]>) {
  const valuesString = wrapInCurlyBrackets(config.values.join(', '));
  const {
    required = false,
    description,
    placeholder = '<value>',
    hidden = false,
  } = config;

  const parser: ICliParser<string | undefined> = {
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
  return parser;
}

export { CliOneOfValuedParser };
