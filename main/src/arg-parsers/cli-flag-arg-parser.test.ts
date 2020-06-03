import { runAndCatch } from '@carnesen/run-and-catch';
import { CliFlagArgParser } from './cli-flag-arg-parser';
import { CLI_USAGE_ERROR } from '../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;

const argParser = CliFlagArgParser({ description, hidden });

describe(CliFlagArgParser.name, () => {
  it('always has "required" set to false', () => {
    expect(argParser.required).toBe(false);
  });

  it('parse returns false if args is undefined', () => {
    expect(argParser.parse(undefined)).toBe(false);
  });

  it('parse returns true if args is an empty array', () => {
    expect(argParser.parse([])).toBe(true);
  });

  it('parse throws a usage error "unexpected argument" if args has a value', async () => {
    const exception = await runAndCatch(argParser.parse, ['foo']);
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
