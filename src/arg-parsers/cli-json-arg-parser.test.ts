import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from '../cli-usage-error';
import { CliJsonArgParser } from './cli-json-arg-parser';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = true;

const argParser = CliJsonArgParser({ description, hidden, placeholder, required });

describe(CliJsonArgParser.name, () => {
  it('parse returns undefined if args is undefined', () => {
    expect(argParser.parse(undefined)).toBe(undefined);
  });

  it('parse returns parsed JSON if args is an array with one JSON-parsable string', () => {
    expect(argParser.parse(['"foo"'])).toBe('foo');
  });

  it('parse throws a usage error "expected a single" if args is an array with zero or more than one items', async () => {
    for (const args of [[], ['', '']]) {
      const exception = await runAndCatch(argParser.parse, args);
      expect(exception.code).toBe(CLI_USAGE_ERROR);
      expect(exception.message).toMatch(/expected a single/i);
      expect(exception.message).toMatch(placeholder);
    }
  });

  it('parse throws a good usage error if the string in args is not parsable', async () => {
    const exception = await runAndCatch(argParser.parse, ['foo']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch("while parsing near 'foo'");
  });

  it('attaches config properties', () => {
    expect(argParser.description).toBe(description);
    expect(argParser.hidden).toBe(hidden);
    expect(argParser.placeholder).toBe(placeholder);
    expect(argParser.required).toBe(required);
  });

  it('config is optional', () => {
    expect(CliJsonArgParser().hidden).toBe(false);
  });
});
