import { Leaf } from './cli-node';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { AnyParser } from './cli-arg-parser';

/**
 * Calls the parse method of an ValuedParser
 *
 * @param parser - An ValuedParser
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
export async function parseArgs(
  parser: AnyParser,
  args: string[] | undefined,
  separator: string | undefined,
  locationInCommandTree: Leaf,
): Promise<any> {
  const { required, placeholder, parse } = parser;
  const fullContext = [separator, placeholder].filter((str) => Boolean(str)).join(' ');
  const prefix = fullContext ? `${fullContext} : ` : '';
  if (required && (!args || args.length === 0)) {
    throw new CliUsageError(`${prefix}argument is required`, locationInCommandTree);
  }
  try {
    return await parse(args);
  } catch (exception) {
    if (exception && typeof exception.message === 'string') {
      exception.message = `${prefix}${exception.message}`;
    }
    if (exception && exception.code === CLI_USAGE_ERROR) {
      exception.locationInCommandTree = locationInCommandTree;
    }
    throw exception;
  }
}
