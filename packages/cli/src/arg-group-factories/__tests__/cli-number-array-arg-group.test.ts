import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliNumberArrayArgGroup } from '../c-cli-number-array-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argGroup = CCliNumberArrayArgGroup.create({
	description,
	hidden,
	placeholder,
	required,
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
		expect(argGroup.options.description).toBe(description);
		expect(argGroup.options.hidden).toBe(hidden);
		expect(argGroup.options.placeholder).toBe(placeholder);
		expect(argGroup.options.required).toBe(required);
	});

	it('config is not required', () => {
		CCliNumberArrayArgGroup.create();
	});
});
