import { CommandStack } from './types';
import { NamedArgs } from './partition-args';
import { parseArgs } from './parse-args';
import { CliUsageError } from './cli-usage-error';
import { AnyNamedArgParsers, NamedValues } from './cli-arg-parser';

export async function getNamedValues(
  namedArgParsers: AnyNamedArgParsers,
  namedArgs: NamedArgs,
  commandStack: CommandStack,
): Promise<NamedValues<AnyNamedArgParsers>> {
  const namedValues: NamedValues<AnyNamedArgParsers> = {};
  const restNamedArgs = { ...namedArgs };
  const asyncFuncs: (() => Promise<void>)[] = [];
  for (const [name, argParser] of Object.entries(namedArgParsers)) {
    const args = restNamedArgs[name];
    delete restNamedArgs[name];
    asyncFuncs.push(async () => {
      const value = await parseArgs(argParser, args, `--${name}`, commandStack);
      namedValues[name] = value;
    });
  }
  const restNames = Object.keys(restNamedArgs);
  if (restNames[0]) {
    throw new CliUsageError(`--${restNames[0]} : Unknown named argument`, commandStack);
  }
  await Promise.all(asyncFuncs.map((asyncFunc) => asyncFunc()));
  return namedValues;
}
