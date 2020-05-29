import { runAndCatch } from '@carnesen/run-and-catch';
import { getNamedValues } from './get-named-values';
import {
  dummyRequiredArgParser,
  dummyArgParser,
  DUMMY_ARG_PARSER_THROW,
} from './dummy-arg-parsers-for-testing';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CliLeaf } from './cli-leaf';
import { LeafStack } from './types';

const leafStack: LeafStack = {
  current: CliLeaf({ name: 'foo', action() {} }),
  parents: [],
};

describe(getNamedValues.name, () => {
  it(`returns object of named values`, async () => {
    const namedValues = await getNamedValues(
      { foo: dummyRequiredArgParser, baz: dummyRequiredArgParser },
      { foo: ['bar'], baz: ['bop'] },
      leafStack,
    );
    expect(namedValues).toEqual({
      foo: dummyRequiredArgParser.parse(['bar']),
      baz: dummyRequiredArgParser.parse(['bop']),
    });
  });

  it(`re-throws error with name-specific context if parse does`, async () => {
    const exception = await runAndCatch(
      getNamedValues,
      { foo123: dummyArgParser },
      { foo123: [DUMMY_ARG_PARSER_THROW] },
      leafStack,
    );
    expect(exception.message).toMatch('--foo123');
    expect(exception.message).toMatchSnapshot();
  });

  it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
    const exception = await runAndCatch(
      getNamedValues,
      { foo123: dummyArgParser },
      { foo1234: [] },
      leafStack,
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch('--foo1234 : Unknown named argument');
  });
});