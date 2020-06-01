import { ICliArgParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';

type Config = Partial<{
  description: string;
  required: boolean;
  hidden: boolean;
  placeholder: string;
}>;

function CliStringArrayArgParser(
  config: Config & { required: true },
): ICliArgParser<string[], true>;
function CliStringArrayArgParser(
  config?: Config,
): ICliArgParser<string[] | undefined, boolean>;
function CliStringArrayArgParser(config: Config = {}) {
  const {
    required = false,
    description,
    placeholder = '<str0> [...]',
    hidden = false,
  } = config;
  const argParser: ICliArgParser<string[] | undefined> = {
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
  return argParser;
}

export { CliStringArrayArgParser };
