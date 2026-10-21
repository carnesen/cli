import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliNumberArrayArgGroup } from '../c-cli-number-array-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const optional = true;

const argGroup = CCliNumberArrayArgGroup.create({
	description,
	hidden,
	placeholder,
	optional,
});

describe(CCliNumberArrayArgGroup.name, () => {
	it('parse returns is args converted to numbers', () => {
		expect(argGroup.parse(['0', '1', '2'])).toEqual([0, 1, 2]);
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
		CCliNumberArrayArgGroup.create();
	});

	it('has a _suggest method always returning []', () => {
		expect(argGroup._suggest([])).toEqual([]);
	});

	it('accepts non-integers by default', () => {
		expect(argGroup.parse(['0.5', '1.5'])).toEqual([0.5, 1.5]);
	});

	describe('integer option', () => {
		const integerGroup = CCliNumberArrayArgGroup.create({ integer: true });

		it('defaults the placeholder to "<int0> [...]"', () => {
			expect(integerGroup.placeholder).toBe('<int0> [...]');
		});

		it('lets an explicit placeholder win', () => {
			const group = CCliNumberArrayArgGroup.create({
				integer: true,
				placeholder: '<ports>',
			});
			expect(group.placeholder).toBe('<ports>');
		});

		it('returns integer values', () => {
			expect(integerGroup.parse(['1', '2', '3'])).toEqual([1, 2, 3]);
		});

		it('throws UsageError naming the first non-integer', async () => {
			const exception = await runAndCatch(integerGroup.parse, [
				'1',
				'2.5',
				'3',
			]);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toBe('"2.5" is not an integer');
		});
	});

	describe('min and max options', () => {
		const rangeGroup = CCliNumberArrayArgGroup.create({ min: 1, max: 10 });

		it('treats the bounds as inclusive', () => {
			expect(rangeGroup.parse(['1', '5', '10'])).toEqual([1, 5, 10]);
		});

		it('throws UsageError if any value is below min', async () => {
			const exception = await runAndCatch(rangeGroup.parse, ['1', '0']);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toBe('"0" is less than the minimum 1');
		});

		it('throws UsageError if any value is above max', async () => {
			const exception = await runAndCatch(rangeGroup.parse, ['5', '11']);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toBe('"11" is greater than the maximum 10');
		});
	});
});
