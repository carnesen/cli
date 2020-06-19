import { CliCommandNode } from './cli-node';
import { NamedArgs } from './partition-args';
import { parseArgs } from './parse-args';
import { CliUsageError } from './cli-usage-error';
import { AnyNamedArgGroups, NamedValues } from './cli-arg-group';

export async function getNamedValues(
	namedArgGroups: AnyNamedArgGroups,
	namedArgs: NamedArgs,
	node: CliCommandNode,
): Promise<NamedValues<AnyNamedArgGroups>> {
	const namedValues: NamedValues<AnyNamedArgGroups> = {};
	const restNamedArgs = { ...namedArgs };
	const asyncFuncs: (() => Promise<void>)[] = [];
	for (const [name, argGroup] of Object.entries(namedArgGroups)) {
		const args = restNamedArgs[name];
		delete restNamedArgs[name];
		asyncFuncs.push(async () => {
			const value = await parseArgs(argGroup, args, `--${name}`, node);
			namedValues[name] = value;
		});
	}
	const restNames = Object.keys(restNamedArgs);
	if (restNames[0]) {
		throw new CliUsageError(`--${restNames[0]} : Unknown named argument`, node);
	}
	await Promise.all(asyncFuncs.map((asyncFunc) => asyncFunc()));
	return namedValues;
}
