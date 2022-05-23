import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliFlagArgGroup } from '../c-cli-flag-arg-group';

const description = 'foo bar baz';
const hidden = true;

const argGroup = CCliFlagArgGroup.create({ description, hidden });

describe(CCliFlagArgGroup.name, () => {
	it('always has "required" set to false', () => {
		expect(argGroup.options.required).toBe(false);
	});

	it('parse returns false if args is undefined', () => {
		expect(argGroup.parse(undefined)).toBe(false);
	});

	it('parse returns true if args is an empty array', () => {
		expect(argGroup.parse([])).toBe(true);
	});

	it('parse throws a usage error "unexpected argument" if args has a value', async () => {
		const exception = await runAndCatch(argGroup.parse, ['foo']);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/unexpected argument/i);
		expect(exception.message).toMatch('"foo"');
	});

	it('attaches passed properties "description" and "hidden"', () => {
		expect(argGroup.options.description).toBe(description);
		expect(argGroup.options.hidden).toBe(hidden);
	});

	it('config is optional', () => {
		expect(CCliFlagArgGroup.create().options.hidden).toBe(undefined);
	});
});
