import { runAndCatch } from '@carnesen/run-and-catch';
import { CliOneOfValuedParser } from './cli-one-of-valued-parser';
import { CLI_USAGE_ERROR } from '../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const parser = CliOneOfValuedParser({
	values: ['foo', 'bar'],
	description,
	hidden,
	placeholder,
	required,
});

describe(CliOneOfValuedParser.name, () => {
	it('parse returns the zeroth element of args', () => {
		expect(parser.parse(['foo'])).toBe('foo');
	});

	it('parse throws usage error "expected one of" if args is an empty array', async () => {
		const exception = await runAndCatch(parser.parse, []);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected <special> to be one of/i);
		expect(exception.message).toMatch(/foo, bar/i);
	});

	it('parse throws usage error "invalid argument ... expected one of" if args has a bad value', async () => {
		const exception = await runAndCatch(parser.parse, ['baz']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected <special> to be one of/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('returns undefined if args is', () => {
		const parser2 = CliOneOfValuedParser({ values: ['foo', 'bar'] });
		expect(parser2.parse(undefined)).toBe(undefined);
	});

	it('attaches config properties', () => {
		expect(parser.description).toMatch(description);
		expect(parser.hidden).toBe(hidden);
		expect(parser.placeholder).toBe(placeholder);
		expect(parser.required).toBe(required);
	});
});
