import { AnyArgParser } from './types';
import { CliUsageError } from './cli-usage-error';

export async function callGetValue(
  argParser: AnyArgParser,
  argv?: string[],
  context?: string,
) {
  const { required, placeholder, getValue } = argParser;
  let prefix = [context, placeholder].filter(Boolean).join(' ');
  if (prefix) {
    prefix += ' : ';
  }
  if (required && (!argv || argv.length === 0)) {
    throw new CliUsageError(`${prefix}ArgParser is required`);
  }
  try {
    return await getValue(argv);
  } catch (exception) {
    if (exception && typeof exception.message === 'string') {
      exception.message = `${prefix}${exception.message}`;
    }
    throw exception;
  }
}
