import { runAndCatch } from '@carnesen/run-and-catch';
import { CliOneOfArgParser } from './cli-one-of-arg-parser';
import { CLI_USAGE_ERROR } from './cli-usage-error';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argParser = CliOneOfArgParser({
  values: ['foo', 'bar'],
  description,
  hidden,
  placeholder,
  required,
});

describe(CliOneOfArgParser.name, () => {
  it('parse returns the zeroth element of args', () => {
    expect(argParser.parse(['foo'])).toBe('foo');
  });

  it('parse throws usage error "expected one of" if args is an empty array', async () => {
    const exception = await runAndCatch(argParser.parse, []);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected <special> to be one of/i);
    expect(exception.message).toMatch(/foo, bar/i);
  });

  it('parse throws usage error "invalid argument ... expected one of" if args has a bad value', async () => {
    const exception = await runAndCatch(argParser.parse, ['baz']);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/expected <special> to be one of/i);
    expect(exception.message).toMatch(placeholder);
  });

  it('returns undefined if args is', () => {
    const argParser2 = CliOneOfArgParser({ values: ['foo', 'bar'] });
    expect(argParser2.parse(undefined)).toBe(undefined);
  });

  it('attaches config properties', () => {
    expect(argParser.description).toMatch(description);
    expect(argParser.hidden).toBe(hidden);
    expect(argParser.placeholder).toBe(placeholder);
    expect(argParser.required).toBe(required);
  });
});
