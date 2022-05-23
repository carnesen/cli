import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliJsonArgGroup } from '../c-cli-json-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = true;

const argGroup = CCliJsonArgGroup.create({
	description,
	hidden,
	placeholder,
	required,
});

describe(CCliJsonArgGroup.name, () => {
	it('parse returns undefined if args is undefined', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse returns parsed JSON if args is an array with one JSON-parsable string', () => {
		expect(argGroup.parse(['"foo"'])).toBe('foo');
	});

	it('parse throws a usage error "expected a single" if args is an array with zero or more than one items', async () => {
		for (const args of [[], ['', '']]) {
			const exception = await runAndCatch(argGroup.parse, args);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toMatch(/expected a single/i);
			expect(exception.message).toMatch(placeholder);
		}
	});

	it('parse throws a good usage error if the string in args is not parsable', async () => {
		const exception = await runAndCatch(argGroup.parse, ['foo']);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch('Unexpected token');
	});

	it('attaches config properties', () => {
		expect(argGroup.options.description).toBe(description);
		expect(argGroup.options.hidden).toBe(hidden);
		expect(argGroup.options.placeholder).toBe(placeholder);
		expect(argGroup.options.required).toBe(required);
	});

	it('config is optional', () => {
		expect(CCliJsonArgGroup.create().options.hidden).toBe(undefined);
	});
});
