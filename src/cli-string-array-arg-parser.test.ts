import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CliStringArrayArgParser } from './cli-string-array-arg-parser';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argParser = CliStringArrayArgParser({ description, hidden, placeholder, required });

describe(CliStringArrayArgParser.name, () => {
  it('getValue returns is argv converted to numbers', () => {
    expect(argParser.getValue(['0', '1', '2'])).toEqual(['0', '1', '2']);
  });

  it('getValue returns `undefined` if argv is', () => {
    expect(argParser.getValue(undefined)).toBe(undefined);
  });

  it('getValue throws USAGE error "expected one or more" if argv is an empty array', async () => {
    const exception = await runAndCatch(argParser.getValue, []);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected one or more/i);
    expect(exception.message).toMatch(placeholder);
  });

  it('attaches config properties', () => {
    expect(argParser.description).toBe(description);
    expect(argParser.hidden).toBe(hidden);
    expect(argParser.placeholder).toBe(placeholder);
    expect(argParser.required).toBe(required);
  });

  it('config is not required', () => {
    CliStringArrayArgParser();
  });
});
