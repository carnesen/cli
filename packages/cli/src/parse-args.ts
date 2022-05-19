import { CliUsageError } from './cli-usage-error';
import { CliArgGroup } from './cli-arg-group';

/**
 * Calls the parse method of an ArgGroup
 *
 * @param argGroup - An ArgGroup
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
export async function parseArgs(
	argGroup: CliArgGroup,
	args: string[] | undefined,
	separator: string | undefined,
): Promise<any> {
	const fullContext = [separator, argGroup.placeholder]
		.filter((str) => Boolean(str))
		.join(' ');
	const prefix = fullContext ? `${fullContext} : ` : '';
	if (argGroup.required && (!args || args.length === 0)) {
		throw new CliUsageError(`${prefix}argument is required`);
	}
	try {
		return await argGroup.parse(args);
	} catch (exception: any) {
		if (exception && typeof exception.message === 'string') {
			exception.message = `${prefix}${exception.message}`;
		}
		throw exception;
	}
}
