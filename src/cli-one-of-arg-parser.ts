import { CliArgParser } from './types';
import { CliUsageError } from './cli-usage-error';
import { wrapInCurlyBrackets, regularizeText } from './util';

type Config<TValues extends string[]> = {
  values: TValues;
  required?: boolean;
  description?: string;
  placeholder?: string;
  hidden?: boolean;
};

function CliOneOfArgParser<U extends string[]>(
  config: Config<U> & { defaultValue: U },
): CliArgParser<U[number], false>;
function CliOneOfArgParser<U extends string[]>(
  config: Config<U> & { required: true },
): CliArgParser<U[number], true>;
function CliOneOfArgParser<U extends string[]>(
  config: Config<U>,
): CliArgParser<U[number] | undefined, false>;
function CliOneOfArgParser(config: Config<string[]>) {
  const valuesString = wrapInCurlyBrackets(config.values.join(', '));
  const {
    required = false,
    description,
    placeholder = '<value>',
    hidden = false,
  } = config;

  const argParser: CliArgParser<string | undefined> = {
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
