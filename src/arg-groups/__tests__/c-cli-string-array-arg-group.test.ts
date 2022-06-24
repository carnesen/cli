import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliStringArrayArgGroup } from '../c-cli-string-array-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const optional = true;

const argGroup = CCliStringArrayArgGroup.create({
	description,
	hidden,
	placeholder,
	optional,
});

describe(CCliStringArrayArgGroup.name, () => {
	it('parse returns is args converted to numbers', () => {
		expect(argGroup.parse(['0', '1', '2'])).toEqual(['0', '1', '2']);
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
		CCliStringArrayArgGroup.create();
	});
});
