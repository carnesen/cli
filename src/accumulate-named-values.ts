import { AnyNamedArgParsers, NamedValues } from './types';
import { NamedArgvs } from './accumulate-argvs';
import { callGetValue } from './call-get-value';
import { CliUsageError } from './cli-usage-error';

export async function accumulateNamedValues(
  namedArgParsers: AnyNamedArgParsers,
  namedArgvs: NamedArgvs,
) {
  const namedValues: NamedValues<AnyNamedArgParsers> = {};
  const restNamedArgvs = { ...namedArgvs };
  const asyncFuncs: (() => Promise<void>)[] = [];
  for (const [name, argParser] of Object.entries(namedArgParsers)) {
    const argv = restNamedArgvs[name];
    delete restNamedArgvs[name];
    asyncFuncs.push(async () => {
      const value = await callGetValue(argParser, argv, `--${name}`);
      namedValues[name] = value;
    });
  }
  const restNames = Object.keys(restNamedArgvs);
  if (restNames[0]) {
    throw new CliUsageError(`--${restNames[0]} : Unknown named argument`);
  }
  await Promise.all(asyncFuncs.map((asyncFunc) => asyncFunc()));
  return namedValues;
}
