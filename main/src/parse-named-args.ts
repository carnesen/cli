import { TPartitioned } from './partition-args';
import { parseArgs } from './parse-args';
import { CliUsageError } from './cli-usage-error';
import { ICliArgGroup } from './cli-arg-group';

type VoidAsyncFunc = () => Promise<void>;

/**
 * Matches named args to named arg groups and calls the `parse` method
 * @param namedArgGroups From the [[`ICliCommand`]]
 * @param namedArgs The --foo bar values from the partition phase
 */
export async function parseNamedArgs(
	namedArgGroups: {
		[name: string]: ICliArgGroup;
	},
	namedArgs: TPartitioned['namedArgs'],
): Promise<{ [name: string]: any }> {
	const namedValues: { [name: string]: any } = {};
	const restNamedArgs = { ...namedArgs };
	const asyncFuncs: VoidAsyncFunc[] = [];
	for (const [name, argGroup] of Object.entries(namedArgGroups)) {
		const args = restNamedArgs[name];
		delete restNamedArgs[name];
		asyncFuncs.push(async () => {
			const value = await parseArgs(argGroup, args, `--${name}`);
			namedValues[name] = value;
		});
	}
	const restNames = Object.keys(restNamedArgs);
	if (restNames[0]) {
		throw new CliUsageError(`--${restNames[0]} : Unknown named argument`);
	}
	await Promise.all(asyncFuncs.map((asyncFunc) => asyncFunc()));
	return namedValues;
}
