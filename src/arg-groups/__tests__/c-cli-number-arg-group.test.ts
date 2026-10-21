import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliNumberArgGroup } from '../c-cli-number-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const optional = true;

const argGroup = CCliNumberArgGroup.create({
	optional,
	description,
	hidden,
	placeholder,
});

describe(CCliNumberArgGroup.name, () => {
	it('returns `undefined` if args is `undefined` and no defaultValue has been provided', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse returns the zeroth element of args', () => {
		expect(argGroup.parse(['1'])).toBe(1);
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

	it('config is optional', () => {
		CCliNumberArgGroup.create();
	});

	it('accepts non-integers by default', () => {
		expect(argGroup.parse(['1.5'])).toBe(1.5);
	});

	describe('integer option', () => {
		const integerGroup = CCliNumberArgGroup.create({ integer: true });

		it('defaults the placeholder to "<int>"', () => {
			expect(integerGroup.placeholder).toBe('<int>');
		});

		it('lets an explicit placeholder win', () => {
			const group = CCliNumberArgGroup.create({
				integer: true,
				placeholder: '<count>',
			});
			expect(group.placeholder).toBe('<count>');
		});

		it('returns an integer value', () => {
			expect(integerGroup.parse(['3'])).toBe(3);
			expect(integerGroup.parse(['-3'])).toBe(-3);
		});

		it('throws UsageError naming the value if it is not an integer', async () => {
			const exception = await runAndCatch(integerGroup.parse, ['1.5']);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toBe('"1.5" is not an integer');
		});
	});

	describe('min and max options', () => {
		const rangeGroup = CCliNumberArgGroup.create({ min: 1, max: 65535 });

		it('keeps the default placeholder "<num>"', () => {
			expect(rangeGroup.placeholder).toBe('<num>');
		});

		it('treats the bounds as inclusive', () => {
			expect(rangeGroup.parse(['1'])).toBe(1);
			expect(rangeGroup.parse(['65535'])).toBe(65535);
		});

		it('throws UsageError if the value is below min', async () => {
			const exception = await runAndCatch(rangeGroup.parse, ['0']);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toBe('"0" is less than the minimum 1');
		});

		it('throws UsageError if the value is above max', async () => {
			const exception = await runAndCatch(rangeGroup.parse, ['70000']);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toBe(
				'"70000" is greater than the maximum 65535',
			);
		});

		it('allows a min of 0', async () => {
			const group = CCliNumberArgGroup.create({ min: 0 });
			expect(group.parse(['0'])).toBe(0);
			const exception = await runAndCatch(group.parse, ['-1']);
			expect(exception.message).toBe('"-1" is less than the minimum 0');
		});
	});
});
