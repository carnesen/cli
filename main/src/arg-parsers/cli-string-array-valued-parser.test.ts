import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from '../cli-usage-error';
import { CliStringArrayValuedParser } from './cli-string-array-valued-parser';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const parser = CliStringArrayValuedParser({
  description,
  hidden,
  placeholder,
  required,
});

describe(CliStringArrayValuedParser.name, () => {
  it('parse returns is args converted to numbers', () => {
    expect(parser.parse(['0', '1', '2'])).toEqual(['0', '1', '2']);
  });

  it('parse returns `undefined` if args is', () => {
    expect(parser.parse(undefined)).toBe(undefined);
  });

  it('parse throws USAGE error "expected one or more" if args is an empty array', async () => {
    const exception = await runAndCatch(parser.parse, []);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected one or more/i);
    expect(exception.message).toMatch(placeholder);
  });

  it('attaches config properties', () => {
    expect(parser.description).toBe(description);
    expect(parser.hidden).toBe(hidden);
    expect(parser.placeholder).toBe(placeholder);
    expect(parser.required).toBe(required);
  });

  it('config is not required', () => {
    CliStringArrayValuedParser();
  });
});
