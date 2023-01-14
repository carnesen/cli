import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliBigintArrayArgGroup } from '../c-cli-bigint-array-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const optional = true;

const argGroup = CCliBigintArrayArgGroup.create({
	description,
	hidden,
	placeholder,
	optional,
});

describe(CCliBigintArrayArgGroup.name, () => {
	it('parse returns is args converted to numbers', () => {
		const parsed = argGroup.parse(['0', '1', '2']);
		if (!parsed) {
			throw new Error('Expected parsed to return a value');
		}
		expect(parsed[0] === 0n).toBe(true);
		expect(parsed[1] === 1n).toBe(true);
		expect(parsed[2] === 2n).toBe(true);
	});

	it('parse returns `undefined` if args is', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse throws USAGE error "expected one or more" if args is an empty array', async () => {
		const exception = await runAndCatch(argGroup.parse, []);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/expected one or more/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('attaches config properties', () => {
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.optional).toBe(optional);
	});

	it('config is optional', () => {
		CCliBigintArrayArgGroup.create();
	});

	it('has a _suggest method always returning []', () => {
		expect(argGroup._suggest([])).toEqual([]);
	});
});
