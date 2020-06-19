import { CliCommandNode } from './cli-node';
import { CliUsageError, CLI_USAGE_ERROR } from './cli-usage-error';
import { AnyArgGroup } from './cli-arg-group';

/**
 * Calls the parse method of an ArgGroup
 *
 * @param argGroup - An ArgGroup
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
export async function parseArgs(
	argGroup: AnyArgGroup,
	args: string[] | undefined,
	separator: string | undefined,
	node: CliCommandNode,
): Promise<any> {
	const { required, placeholder, parse } = argGroup;
	const fullContext = [separator, placeholder]
		.filter((str) => Boolean(str))
		.join(' ');
	const prefix = fullContext ? `${fullContext} : ` : '';
	if (required && (!args || args.length === 0)) {
		throw new CliUsageError(`${prefix}argument is required`, node);
	}
	try {
		return await parse(args);
	} catch (exception) {
		if (exception && typeof exception.message === 'string') {
			exception.message = `${prefix}${exception.message}`;
		}
		if (exception && exception.code === CLI_USAGE_ERROR) {
			exception.node = node;
		}
		throw exception;
	}
}
