import { runAndCatch } from '@carnesen/run-and-catch';
import { CliNumberArgParser } from './cli-number-arg-parser';
import { CLI_USAGE_ERROR } from '../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argParser = CliNumberArgParser({ required, description, hidden, placeholder });

describe(CliNumberArgParser.name, () => {
  it('returns `undefined` if args is `undefined` and no defaultValue has been provided', () => {
    expect(argParser.parse(undefined)).toBe(undefined);
  });

  it('returns defaultValue if args is `undefined` and defaultValue has been provided', () => {
    const argParser2 = CliNumberArgParser({ defaultValue: 0 });
    expect(argParser2.parse(undefined)).toBe(0);
  });

  it('parse returns the zeroth element of args', () => {
    expect(argParser.parse(['1'])).toBe(1);
  });

  it('throws UsageError "expected just one" if args has more than one element', async () => {
    const exception = await runAndCatch(argParser.parse, ['0', '1']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected just one/i);
    expect(exception.message).toMatch(placeholder);
  });

  it('throws UsageError "expected a" if args is an empty array', async () => {
    const exception = await runAndCatch(argParser.parse, []);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected a/i);
    expect(exception.message).toMatch(placeholder);
  });

  it('attaches config properties', () => {
    expect(argParser.description).toBe(description);
    expect(argParser.hidden).toBe(hidden);
    expect(argParser.placeholder).toBe(placeholder);
    expect(argParser.required).toBe(required);
  });

  it('config is not required', () => {
    CliNumberArgParser();
  });
});
