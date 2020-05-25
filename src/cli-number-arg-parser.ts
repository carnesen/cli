import { CliArgParser } from './types';
import { convertToNumber } from './util';
import { CliUsageError } from './cli-usage-error';

type Config = Partial<{
  required: boolean;
  description: string;
  defaultValue: number;
  placeholder: string;
  hidden: boolean;
}>;

function CliNumberArgParser(
  config: Config & { defaultValue: number },
): CliArgParser<number, false>;
function CliNumberArgParser(
  config: Config & { required: true },
): CliArgParser<number, true>;
function CliNumberArgParser(config?: Config): CliArgParser<number | undefined, boolean>;
function CliNumberArgParser(config: Config = {}) {
  const {
    required = false,
    description,
    defaultValue,
    placeholder = '<num>',
    hidden = false,
  } = config;
  const argParser: CliArgParser<number | undefined> = {
    required,
    hidden,
    getValue(args) {
      if (!args) {
        return typeof defaultValue === 'number' ? defaultValue : undefined;
      }

      if (args.length > 1) {
        throw new CliUsageError(`Expected just one ${placeholder}`);
      }

      if (args.length === 0) {
        throw new CliUsageError(`Expected a ${placeholder}`);
      }

      return convertToNumber(args[0]);
    },
    description,
    placeholder,
  };
  return argParser;
}

export { CliNumberArgParser };
