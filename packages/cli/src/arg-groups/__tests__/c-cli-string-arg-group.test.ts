import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliStringArgGroup } from '../c-cli-string-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const optional = true;

const argGroup = CCliStringArgGroup.create({
	optional,
	description,
	hidden,
	placeholder,
});

describe(CCliStringArgGroup.name, () => {
	it('returns `undefined` if args is `undefined` and no defaultValue has been provided', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse returns the zeroth element of args', () => {
		expect(argGroup.parse(['1'])).toBe('1');
	});

	it('throws UsageError "expected just one" if args has more than one element', async () => {
		const exception = await runAndCatch(argGroup.parse, ['0', '1']);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/expected a single/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('throws UsageError "expected a" if args is an empty array', async () => {
		const exception = await runAndCatch(argGroup.parse, []);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/expected a/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('attaches config properties', () => {
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.optional).toBe(optional);
	});

	it('config is not optional', () => {
		CCliStringArgGroup.create();
	});
});
