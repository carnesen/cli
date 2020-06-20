import { runAndCatch } from '@carnesen/run-and-catch';
import { CliNumberArgGroup } from './cli-number-arg-group';
import { CLI_USAGE_ERROR } from '../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argGroup = CliNumberArgGroup({
	required,
	description,
	hidden,
	placeholder,
});

describe(CliNumberArgGroup.name, () => {
	it('returns `undefined` if args is `undefined` and no defaultValue has been provided', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse returns the zeroth element of args', () => {
		expect(argGroup.parse(['1'])).toBe(1);
	});

	it('throws UsageError "expected just one" if args has more than one element', async () => {
		const exception = await runAndCatch(argGroup.parse, ['0', '1']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected just one/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('throws UsageError "expected a" if args is an empty array', async () => {
		const exception = await runAndCatch(argGroup.parse, []);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected a/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('attaches config properties', () => {
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.required).toBe(required);
	});

	it('config is not required', () => {
		CliNumberArgGroup();
	});
});
