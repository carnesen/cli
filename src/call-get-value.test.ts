import { runAndCatch } from '@carnesen/run-and-catch';

import { callGetValue } from './call-get-value';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import {
  dummyArgParser,
  dummyRequiredArgParser,
  DUMMY_INPUT_THROWN_INTENTIONALLY,
  DUMMY_INPUT_THROW,
  DUMMY_INPUT_THROW_NON_TRUTHY,
} from './dummy-inputs-for-testing';

describe(callGetValue.name, () => {
  it(`returns getValue(argv) if an argv with length >= 1 is passed`, async () => {
    const argv = ['foo'];
    expect(await callGetValue(dummyArgParser, argv)).toBe(dummyArgParser.getValue(argv));
    expect(await callGetValue(dummyRequiredArgParser, argv)).toBe(
      dummyRequiredArgParser.getValue(argv),
    );
  });

  it(`if not required, returns getValue(argv) if argv is an empty array or undefined`, async () => {
    expect(await callGetValue(dummyArgParser, [])).toBe(dummyArgParser.getValue([]));
    expect(await callGetValue(dummyArgParser, undefined)).toBe(
      dummyArgParser.getValue(undefined),
    );
  });

  it(`if required, throws usage error "argParser is required" if argv is an empty array or undefined`, async () => {
    for (const argv of [undefined, [] as string[]]) {
      const exception = await runAndCatch(callGetValue, dummyRequiredArgParser, argv);
      expect(exception.code).toBe(CLI_USAGE_ERROR);
      expect(exception.message).toMatch(/ArgParser is required/i);
      expect(exception.message).toMatch(dummyRequiredArgParser.placeholder);
    }
  });

  it(`if throws "argParser is required", expect message to match snapshot`, async () => {
    const exception = await runAndCatch(callGetValue, dummyRequiredArgParser);
    expect(exception.message).toMatchSnapshot();
  });

  it(`if throws "argParser is required" with context, expect message to match snapshot`, async () => {
    const exception = await runAndCatch(
      callGetValue,
      dummyRequiredArgParser,
      undefined,
      'context',
    );
    expect(exception.message).toMatchSnapshot();
  });

  it(`throws if getValue does with a context/placeholder enhanced message`, async () => {
    const exception = await runAndCatch(callGetValue, dummyArgParser, [
      DUMMY_INPUT_THROW,
    ]);
    expect(exception.message).toMatch(DUMMY_INPUT_THROWN_INTENTIONALLY);
    expect(exception.message).toMatch(dummyArgParser.placeholder);
    expect(exception.message).toMatchSnapshot();
  });

  it(`just re-throws exception if getValue throws a non-truthy exception`, async () => {
    const exception = await runAndCatch(callGetValue, dummyArgParser, [
      DUMMY_INPUT_THROW_NON_TRUTHY,
    ]);
    expect(exception).not.toBeTruthy();
  });
});
