import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CliJsonArgParser } from './cli-json-arg-parser';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = true;

const argParser = CliJsonArgParser({ description, hidden, placeholder, required });

describe(CliJsonArgParser.name, () => {
  it('getValue returns undefined if argv is undefined', () => {
    expect(argParser.getValue(undefined)).toBe(undefined);
  });

  it('getValue returns parsed JSON if argv is an array with one JSON-parsable string', () => {
    expect(argParser.getValue(['"foo"'])).toBe('foo');
  });

  it('getValue throws a usage error "expected a single" if argv is an array with zero or more than one items', async () => {
    for (const argv of [[], ['', '']]) {
      const exception = await runAndCatch(argParser.getValue, argv);
      expect(exception.code).toBe(CLI_USAGE_ERROR);
      expect(exception.message).toMatch(/expected a single/i);
      expect(exception.message).toMatch(placeholder);
    }
  });

  it('getValue throws a good usage error if the string in argv is not parsable', async () => {
    const exception = await runAndCatch(argParser.getValue, ['foo']);
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
