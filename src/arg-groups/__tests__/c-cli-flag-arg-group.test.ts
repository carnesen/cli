import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliFlagArgGroup } from '../c-cli-flag-arg-group';

const description = 'foo bar baz';
const hidden = true;

const argGroup = CCliFlagArgGroup.create({ description, hidden });

describe(CCliFlagArgGroup.name, () => {
	it('always has "optional" set to true', () => {
		expect(argGroup.optional).toBe(true);
	});

	it('parse returns undefined if args is undefined', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
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
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
	});

	it('config is optional', () => {
		expect(CCliFlagArgGroup.create().hidden).toBe(false);
	});
});
