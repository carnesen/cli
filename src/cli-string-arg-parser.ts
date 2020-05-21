import { CliArgParser } from './types';
import { CliUsageError } from './cli-usage-error';

type Config = Partial<{
  required: boolean;
  description: string;
  defaultValue: string;
  hidden?: boolean;
  placeholder?: string;
}>;

function CliStringArgParser(
  config: Config & { defaultValue: string },
): CliArgParser<string, false>;
function CliStringArgParser(
  config: Config & { required: true },
): CliArgParser<string, true>;
function CliStringArgParser(config?: Config): CliArgParser<string | undefined, false>;
function CliStringArgParser(config: Config = {}) {
  const {
    defaultValue,
    required = false,
    description,
    placeholder = '<str>',
    hidden = false,
  } = config;
  const argParser: CliArgParser<string | undefined> = {
    hidden,
    placeholder,
    required,
    getValue(argv) {
      if (!argv) {
        return typeof defaultValue === 'string' ? defaultValue : undefined;
      }

      if (argv.length > 1) {
        throw new CliUsageError(`Expected just one ${placeholder}`);
      }

      if (argv.length === 0) {
        throw new CliUsageError(`Expected a ${placeholder}`);
      }

      return argv[0];
    },
    description,
  };
  return argParser;
}

export { CliStringArgParser };
