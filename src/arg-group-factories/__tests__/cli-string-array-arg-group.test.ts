import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from '../../cli-usage-error';
import { CliStringArrayArgGroup } from '../cli-string-array-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;

const argGroup = CliStringArrayArgGroup({
	description,
	hidden,
	placeholder,
	required,
});

describe(CliStringArrayArgGroup.name, () => {
	it('parse returns is args converted to numbers', () => {
		expect(argGroup.parse(['0', '1', '2'])).toEqual(['0', '1', '2']);
	});

	it('parse returns `undefined` if args is', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse throws USAGE error "expected one or more" if args is an empty array', async () => {
		const exception = await runAndCatch(argGroup.parse, []);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/expected one or more/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('attaches config properties', () => {
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.required).toBe(required);
	});

	it('config is not required', () => {
		CliStringArrayArgGroup();
	});
});
