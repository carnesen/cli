import { runAndCatch } from '@carnesen/run-and-catch';
import { accumulateNamedValues } from './accumulate-named-values';
import {
  dummyRequiredArgParser,
  dummyArgParser,
  DUMMY_INPUT_THROW,
} from './dummy-inputs-for-testing';
import { CLI_USAGE_ERROR } from './cli-usage-error';

describe(accumulateNamedValues.name, () => {
  it(`returns object of named values`, async () => {
    const namedValues = await accumulateNamedValues(
      { foo: dummyRequiredArgParser, baz: dummyRequiredArgParser },
      { foo: ['bar'], baz: ['bop'] },
    );
    expect(namedValues).toEqual({
      foo: dummyRequiredArgParser.getValue(['bar']),
      baz: dummyRequiredArgParser.getValue(['bop']),
    });
  });

  it(`re-throws error with name-specific context if getValue does`, async () => {
    const exception = await runAndCatch(
      accumulateNamedValues,
      { foo123: dummyArgParser },
      { foo123: [DUMMY_INPUT_THROW] },
    );
    expect(exception.message).toMatch('--foo123');
    expect(exception.message).toMatchSnapshot();
  });

  it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
    const exception = await runAndCatch(
      accumulateNamedValues,
      { foo123: dummyArgParser },
      { foo1234: [] },
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch('--foo1234 : Unknown named argument');
  });
});
