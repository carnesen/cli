import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from '../cli-usage-error';
import { CliJsonValuedParser } from './cli-json-valued-parser';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = true;

const parser = CliJsonValuedParser({ description, hidden, placeholder, required });

describe(CliJsonValuedParser.name, () => {
  it('parse returns undefined if args is undefined', () => {
    expect(parser.parse(undefined)).toBe(undefined);
  });

  it('parse returns parsed JSON if args is an array with one JSON-parsable string', () => {
    expect(parser.parse(['"foo"'])).toBe('foo');
  });

  it('parse throws a usage error "expected a single" if args is an array with zero or more than one items', async () => {
    for (const args of [[], ['', '']]) {
      const exception = await runAndCatch(parser.parse, args);
      expect(exception.code).toBe(CLI_USAGE_ERROR);
      expect(exception.message).toMatch(/expected a single/i);
      expect(exception.message).toMatch(placeholder);
    }
  });

  it('parse throws a good usage error if the string in args is not parsable', async () => {
    const exception = await runAndCatch(parser.parse, ['foo']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch("while parsing near 'foo'");
  });

  it('attaches config properties', () => {
    expect(parser.description).toBe(description);
    expect(parser.hidden).toBe(hidden);
    expect(parser.placeholder).toBe(placeholder);
    expect(parser.required).toBe(required);
  });

  it('config is optional', () => {
    expect(CliJsonValuedParser().hidden).toBe(false);
  });
});
