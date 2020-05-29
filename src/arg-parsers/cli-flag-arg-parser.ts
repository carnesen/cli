import { CliArgParser } from '../types';
import { CliUsageError } from '../cli-usage-error';

type Config = Partial<{ description: string; hidden: boolean }>;

export function CliFlagArgParser(config: Config = {}): CliArgParser<boolean, false> {
  const { description, hidden = false } = config;
  const argParser: CliArgParser<boolean, false> = {
    placeholder: '',
    required: false,
    hidden,
    parse(args) {
      if (!args) {
        return false;
      }
      if (args.length > 0) {
        throw new CliUsageError(`Unexpected argument "${args[0]}"`);
      }
      return true;
    },
    description,
  };
  return argParser;
}
