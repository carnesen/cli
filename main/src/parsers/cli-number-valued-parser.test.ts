import { runAndCatch } from '@carnesen/run-and-catch';
import { CliNumberValuedParser } from './cli-number-valued-parser';
import { CLI_USAGE_ERROR } from '../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const parser = CliNumberValuedParser({
	required,
	description,
	hidden,
	placeholder,
});

describe(CliNumberValuedParser.name, () => {
	it('returns `undefined` if args is `undefined` and no defaultValue has been provided', () => {
		expect(parser.parse(undefined)).toBe(undefined);
	});

	it('parse returns the zeroth element of args', () => {
		expect(parser.parse(['1'])).toBe(1);
	});

	it('throws UsageError "expected just one" if args has more than one element', async () => {
		const exception = await runAndCatch(parser.parse, ['0', '1']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected just one/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('throws UsageError "expected a" if args is an empty array', async () => {
		const exception = await runAndCatch(parser.parse, []);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected a/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('attaches config properties', () => {
		expect(parser.description).toBe(description);
		expect(parser.hidden).toBe(hidden);
		expect(parser.placeholder).toBe(placeholder);
		expect(parser.required).toBe(required);
	});

	it('config is not required', () => {
		CliNumberValuedParser();
	});
});
