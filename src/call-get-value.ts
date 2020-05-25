import { AnyArgParser } from './types';
import { CliUsageError } from './cli-usage-error';

export async function callGetValue(
  argParser: AnyArgParser,
  args?: string[],
  context?: string,
): Promise<any> {
  const { required, placeholder, getValue } = argParser;
  let prefix = [context, placeholder].filter(Boolean).join(' ');
  if (prefix) {
    prefix += ' : ';
  }
  if (required && (!args || args.length === 0)) {
    throw new CliUsageError(`${prefix}ArgParser is required`);
  }
  try {
    return await getValue(args);
  } catch (exception) {
    if (exception && typeof exception.message === 'string') {
      exception.message = `${prefix}${exception.message}`;
    }
    throw exception;
  }
}
