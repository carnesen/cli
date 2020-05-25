import { AnyNamedArgParsers, NamedValues } from './types';
import { NamedArgs } from './accumulate-args';
import { callGetValue } from './call-get-value';
import { CliUsageError } from './cli-usage-error';

type AccumulatedNamedValues = {
  [argName: string]: any;
};
export async function accumulateNamedValues(
  namedArgParsers: AnyNamedArgParsers,
  namedArgs: NamedArgs,
): Promise<AccumulatedNamedValues> {
  const namedValues: NamedValues<AnyNamedArgParsers> = {};
  const restNamedArgs = { ...namedArgs };
  const asyncFuncs: (() => Promise<void>)[] = [];
  for (const [name, argParser] of Object.entries(namedArgParsers)) {
    const args = restNamedArgs[name];
    delete restNamedArgs[name];
    asyncFuncs.push(async () => {
      const value = await callGetValue(argParser, args, `--${name}`);
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
