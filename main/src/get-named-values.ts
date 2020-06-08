import { CliCommandNode } from './cli-node';
import { NamedArgs } from './partition-args';
import { parseArgs } from './parse-args';
import { CliUsageError } from './cli-usage-error';
import { AnyNamedParsers, NamedValues } from './cli-parser';

export async function getNamedValues(
  namedValuedParsers: AnyNamedParsers,
  namedArgs: NamedArgs,
  node: CliCommandNode,
): Promise<NamedValues<AnyNamedParsers>> {
  const namedValues: NamedValues<AnyNamedParsers> = {};
  const restNamedArgs = { ...namedArgs };
  const asyncFuncs: (() => Promise<void>)[] = [];
  for (const [name, parser] of Object.entries(namedValuedParsers)) {
    const args = restNamedArgs[name];
    delete restNamedArgs[name];
    asyncFuncs.push(async () => {
      const value = await parseArgs(parser, args, `--${name}`, node);
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
