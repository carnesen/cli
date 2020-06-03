import { runAndCatch } from '@carnesen/run-and-catch';

import { parseArgs } from './parse-args';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import {
  dummyArgParser,
  dummyRequiredArgParser,
  DUMMY_ARG_PARSER_THROWN_INTENTIONALLY,
  DUMMY_ARG_PARSER_THROW,
  DUMMY_ARG_PARSER_THROW_NON_TRUTHY,
} from './dummy-arg-parsers-for-testing';
import { CliCommand } from './cli-command';
import { CommandStack } from './types';

const commandStack: CommandStack = {
  current: CliCommand({ name: 'foo', action() {} }),
  parents: [],
};

describe(parseArgs.name, () => {
  it(`returns parse(args) if an args with length >= 1 is passed`, async () => {
    const args = ['foo'];
    expect(await parseArgs(dummyArgParser, args, undefined, commandStack)).toBe(
      dummyArgParser.parse(args),
    );
    expect(await parseArgs(dummyRequiredArgParser, args, undefined, commandStack)).toBe(
      dummyRequiredArgParser.parse(args),
    );
  });

  it(`if not required, returns parse(args) if args is an empty array or undefined`, async () => {
    expect(await parseArgs(dummyArgParser, [], undefined, commandStack)).toBe(
      dummyArgParser.parse([]),
    );
    expect(await parseArgs(dummyArgParser, undefined, undefined, commandStack)).toBe(
      dummyArgParser.parse(undefined),
    );
  });

  it(`if required, throws usage error "argument is required" if args is an empty array or undefined`, async () => {
    for (const args of [undefined, [] as string[]]) {
      const exception = await runAndCatch(
        parseArgs,
        dummyRequiredArgParser,
        args,
        undefined,
        commandStack,
      );
      expect(exception.code).toBe(CLI_USAGE_ERROR);
      expect(exception.message).toMatch(/argument is required/i);
      expect(exception.message).toMatch(dummyRequiredArgParser.placeholder);
    }
  });

  it(`if throws "argParser is required", expect message to match snapshot`, async () => {
    const exception = await runAndCatch(
      parseArgs,
      dummyRequiredArgParser,
      undefined,
      undefined,
      commandStack,
    );
    expect(exception.message).toMatchSnapshot();
  });

  it(`if throws "argParser is required" with context, expect message to match snapshot`, async () => {
    const exception = await runAndCatch(
      parseArgs,
      dummyRequiredArgParser,
      undefined,
      'context',
      commandStack,
    );
    expect(exception.message).toMatchSnapshot();
  });

  it(`throws if parse does with a context/placeholder enhanced message`, async () => {
    const exception = await runAndCatch(
      parseArgs,
      dummyArgParser,
      [DUMMY_ARG_PARSER_THROW],
      undefined,
      commandStack,
    );
    expect(exception.message).toMatch(DUMMY_ARG_PARSER_THROWN_INTENTIONALLY);
    expect(exception.message).toMatch(dummyArgParser.placeholder);
    expect(exception.message).toMatchSnapshot();
  });

  it(`just re-throws exception if parse throws a non-truthy exception`, async () => {
    const exception = await runAndCatch(
      parseArgs,
      dummyArgParser,
      [DUMMY_ARG_PARSER_THROW_NON_TRUTHY],
      undefined,
      commandStack,
    );
    expect(exception).not.toBeTruthy();
  });
});
