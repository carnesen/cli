import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBooleanValuedParser } from './cli-boolean-valued-parser';
import { CLI_USAGE_ERROR } from '../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;

const parser = CliBooleanValuedParser({ description, hidden });

describe(CliBooleanValuedParser.name, () => {
  it('always has "required" set to false', () => {
    expect(parser.required).toBe(false);
  });

  it('parse returns false if args is undefined', () => {
    expect(parser.parse(undefined)).toBe(false);
  });

  it('parse returns true if args is an empty array', () => {
    expect(parser.parse([])).toBe(true);
  });

  it('parse throws a usage error "unexpected argument" if args has a value', async () => {
    const exception = await runAndCatch(parser.parse, ['foo']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/unexpected argument/i);
    expect(exception.message).toMatch('"foo"');
  });

  it('attaches passed properties "description" and "hidden"', () => {
    expect(parser.description).toBe(description);
    expect(parser.hidden).toBe(hidden);
  });

  it('config is optional', () => {
    expect(CliBooleanValuedParser().hidden).toBe(false);
  });
});
