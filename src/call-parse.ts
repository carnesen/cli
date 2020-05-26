import { AnyArgParser } from './types';
import { CliUsageError } from './cli-usage-error';

/**
 * Calls the parse method of an ArgParser
 *
 * @param argParser - An ArgParser
 * @param args - An array of string arguments
 * @param context - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
export async function callParse(
  argParser: AnyArgParser,
  args?: string[],
  context?: string,
): Promise<any> {
  const { required, placeholder, parse } = argParser;
  const fullContext = [context, placeholder].filter((str) => Boolean(str)).join(' ');
  const prefix = fullContext ? `${fullContext} : ` : '';
  if (required && (!args || args.length === 0)) {
    throw new CliUsageError(`${prefix}argument is required`);
  }
  try {
    return await parse(args);
  } catch (exception) {
    if (exception && typeof exception.message === 'string') {
      exception.message = `${prefix}${exception.message}`;
    }
    throw exception;
  }
}
