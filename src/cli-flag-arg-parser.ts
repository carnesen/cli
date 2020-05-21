import { CliArgParser } from './types';
import { CliUsageError } from './cli-usage-error';

type Config = Partial<{ description: string; hidden: boolean }>;

export function CliFlagArgParser(config: Config = {}) {
  const { description, hidden = false } = config;
  const argParser: CliArgParser<boolean, false> = {
    placeholder: '',
    required: false,
    hidden,
    getValue(argv) {
      if (!argv) {
        return false;
      }
      if (argv.length > 0) {
        throw new CliUsageError(`Unexpected argument "${argv[0]}"`);
      }
      return true;
    },
    description,
  };
  return argParser;
}
