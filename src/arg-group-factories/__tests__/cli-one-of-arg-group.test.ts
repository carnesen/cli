import { runAndCatch } from '@carnesen/run-and-catch';
import { CliStringChoiceArgGroup } from '../cli-one-of-arg-group';
import { CLI_USAGE_ERROR } from '../../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argGroup = CliStringChoiceArgGroup({
	choices: ['foo', 'bar'],
	description,
	hidden,
	placeholder,
	required,
});

describe(CliStringChoiceArgGroup.name, () => {
	it('parse returns the zeroth element of args', () => {
		expect(argGroup.parse(['foo'])).toBe('foo');
	});

	it('parse throws usage error "expected one of" if args is an empty array', async () => {
		const exception = await runAndCatch(argGroup.parse, []);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected <special> to be one of/i);
		expect(exception.message).toMatch(/foo, bar/i);
	});

	it('parse throws usage error "invalid argument ... expected one of" if args has a bad value', async () => {
		const exception = await runAndCatch(argGroup.parse, ['baz']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected <special> to be one of/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('returns undefined if args is', () => {
		const argGroup2 = CliStringChoiceArgGroup({ choices: ['foo', 'bar'] });
		expect(argGroup2.parse(undefined)).toBe(undefined);
	});

	it('attaches config properties', () => {
		expect(argGroup.description).toMatch(description);
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.required).toBe(required);
	});

	it('has experimental _suggest api', async () => {
		const suggestions = await argGroup._suggest!([]);
		expect(suggestions).toEqual(['foo', 'bar']);
	});
});
