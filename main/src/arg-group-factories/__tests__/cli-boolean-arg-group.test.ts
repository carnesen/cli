import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBooleanArgGroup } from '../cli-boolean-arg-group';
import { CLI_USAGE_ERROR } from '../../cli-usage-error';

const description = 'foo bar baz';
const hidden = true;

const argGroup = CliBooleanArgGroup({ description, hidden });

describe(CliBooleanArgGroup.name, () => {
	it('always has "required" set to false', () => {
		expect(argGroup.required).toBe(false);
	});

	it('parse returns false if args is undefined', () => {
		expect(argGroup.parse(undefined)).toBe(false);
	});

	it('parse returns true if args is an empty array', () => {
		expect(argGroup.parse([])).toBe(true);
	});

	it('parse throws a usage error "unexpected argument" if args has a value', async () => {
		const exception = await runAndCatch(argGroup.parse, ['foo']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/unexpected argument/i);
		expect(exception.message).toMatch('"foo"');
	});

	it('attaches passed properties "description" and "hidden"', () => {
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
	});

	it('config is optional', () => {
		expect(CliBooleanArgGroup().hidden).toBe(false);
	});
});
