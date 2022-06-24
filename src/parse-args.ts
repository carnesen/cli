import { CCliUsageError } from './c-cli-usage-error';
import { CCliArgGroup } from './c-cli-arg-group';

/** Call the parse method of a {@link CCliArgGroup}
 * @param argGroup - An ArgGroup
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse */
export async function parseArgs(
	argGroup: CCliArgGroup,
	args: string[] | undefined,
	separator: string | undefined,
): Promise<any> {
	const fullContext = [separator, argGroup.placeholder]
		.filter((str) => Boolean(str))
		.join(' ');
	const prefix = fullContext ? `${fullContext} : ` : '';
	if (!argGroup.optional && (!args || args.length === 0)) {
		throw new CCliUsageError(`${prefix}argument is not optional`);
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
