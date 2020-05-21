import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CliStringArgParser } from './cli-string-arg-parser';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argParser = CliStringArgParser({ required, description, hidden, placeholder });

describe(CliStringArgParser.name, () => {
  it('returns `undefined` if argv is `undefined` and no defaultValue has been provided', () => {
    expect(argParser.getValue(undefined)).toBe(undefined);
  });

  it('returns defaultValue if argv is `undefined` and defaultValue has been provided', () => {
    const argParser2 = CliStringArgParser({ defaultValue: '0' });
    expect(argParser2.getValue(undefined)).toBe('0');
  });

  it('getValue returns the zeroth element of argv', () => {
    expect(argParser.getValue(['1'])).toBe('1');
  });

  it('throws UsageError "expected just one" if argv has more than one element', async () => {
    const exception = await runAndCatch(argParser.getValue, ['0', '1']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected just one/i);
    expect(exception.message).toMatch(placeholder);
  });

  it('throws UsageError "expected a" if argv is an empty array', async () => {
    const exception = await runAndCatch(argParser.getValue, []);
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
    CliStringArgParser();
  });
});
