import { CCliUsageError } from './c-cli-usage-error';
import { CCliAbstractArgGroup } from './c-cli-abstract-arg-group';

/**
 * Calls the parse method of an ArgGroup
 *
 * @param argGroup - An ArgGroup
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
export async function parseArgs(
	argGroup: CCliAbstractArgGroup,
	args: string[] | undefined,
	separator: string | undefined,
): Promise<any> {
	const fullContext = [separator, argGroup.options.placeholder]
		.filter((str) => Boolean(str))
		.join(' ');
	const prefix = fullContext ? `${fullContext} : ` : '';
	if (argGroup.options.required && (!args || args.length === 0)) {
		throw new CCliUsageError(`${prefix}argument is required`);
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
