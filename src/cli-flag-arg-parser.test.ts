import { runAndCatch } from '@carnesen/run-and-catch';
import { CliFlagArgParser } from './cli-flag-arg-parser';
import { CLI_USAGE_ERROR } from './cli-usage-error';

const description = 'foo bar baz';
const hidden = true;

const argParser = CliFlagArgParser({ description, hidden });

describe(CliFlagArgParser.name, () => {
  it('always has "required" set to false', () => {
    expect(argParser.required).toBe(false);
  });

  it('getValue returns false if argv is undefined', () => {
    expect(argParser.getValue(undefined)).toBe(false);
  });

  it('getValue returns true if argv is an empty array', () => {
    expect(argParser.getValue([])).toBe(true);
  });

  it('getValue throws a usage error "unexpected argument" if argv has a value', async () => {
    const exception = await runAndCatch(argParser.getValue, ['foo']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/unexpected argument/i);
    expect(exception.message).toMatch('"foo"');
  });

  it('attaches passed properties "description" and "hidden"', () => {
    expect(argParser.description).toBe(description);
    expect(argParser.hidden).toBe(hidden);
  });

  it('config is optional', () => {
    expect(CliFlagArgParser().hidden).toBe(false);
  });
});
