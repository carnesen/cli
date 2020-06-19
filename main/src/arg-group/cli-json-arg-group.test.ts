import { runAndCatch } from '@carnesen/run-and-catch';
import { CLI_USAGE_ERROR } from '../cli-usage-error';
import { CliJsonArgGroup } from './cli-json-arg-group';

const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = true;

const argGroup = CliJsonArgGroup({
	description,
	hidden,
	placeholder,
	required,
});

describe(CliJsonArgGroup.name, () => {
	it('parse returns undefined if args is undefined', () => {
		expect(argGroup.parse(undefined)).toBe(undefined);
	});

	it('parse returns parsed JSON if args is an array with one JSON-parsable string', () => {
		expect(argGroup.parse(['"foo"'])).toBe('foo');
	});

	it('parse throws a usage error "expected a single" if args is an array with zero or more than one items', async () => {
		for (const args of [[], ['', '']]) {
			const exception = await runAndCatch(argGroup.parse, args);
			expect(exception.code).toBe(CLI_USAGE_ERROR);
			expect(exception.message).toMatch(/expected a single/i);
			expect(exception.message).toMatch(placeholder);
		}
	});

	it('parse throws a good usage error if the string in args is not parsable', async () => {
		const exception = await runAndCatch(argGroup.parse, ['foo']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch('Unexpected token');
	});

	it('attaches config properties', () => {
		expect(argGroup.description).toBe(description);
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.required).toBe(required);
	});

	it('config is optional', () => {
		expect(CliJsonArgGroup().hidden).toBe(false);
	});
});
