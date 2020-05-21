import parseJson = require('parse-json');

import { CliArgParser } from './types';
import { CliUsageError } from './cli-usage-error';

type Config = Partial<{
  description: string;
  required: boolean;
  placeholder: string;
  hidden: boolean;
}>;

// Because a JSON argParser value has type `any`, we don't need to do anything fancy
// with function overloads to handle the "required" field like we do for other
// argParser factories.
export function CliJsonArgParser(config: Config = {}) {
  const {
    placeholder = '<json>',
    required = false,
    description,
    hidden = false,
  } = config;
  const argParser: CliArgParser<any> = {
    required,
    placeholder,
    hidden,
    getValue(argv) {
      if (!argv) {
        return undefined;
      }
      if (argv.length !== 1) {
        throw new CliUsageError(`Expected a single ${placeholder} string`);
      }
      try {
        const parsed = parseJson(argv[0]);
        return parsed;
      } catch (exception) {
        throw new CliUsageError(exception.message);
      }
    },
    description,
  };
  return argParser;
}