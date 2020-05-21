import { CliArgParser } from './types';
import { convertToNumber } from './util';
import { CliUsageError } from './cli-usage-error';

type Config = Partial<{
  description: string;
  required: boolean;
  placeholder: string;
  hidden: boolean;
}>;

function CliNumberArrayArgParser(
  config: Config & { required: true },
): CliArgParser<number[], true>;
function CliNumberArrayArgParser(
  config?: Config,
): CliArgParser<number[] | undefined, boolean>;
function CliNumberArrayArgParser(config: Config = {}) {
  const {
    required = false,
    description,
    placeholder = '<num0> [...]',
    hidden = false,
  } = config;
  const argParser: CliArgParser<number[] | undefined> = {
    required,
    hidden,
    getValue(argv) {
      if (!argv) {
        return undefined;
      }

      if (argv.length === 0) {
        throw new CliUsageError(`Expected one or more arguments ${placeholder}`);
      }

      return argv.map(convertToNumber);
    },
    description,
    placeholder,
  };
  return argParser;
}

export { CliNumberArrayArgParser };