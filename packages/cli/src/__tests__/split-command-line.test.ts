import { splitCommandLine } from '../split-command-line';

const splitData: {
	title: string;
	line: string;
	args: string[];
	quoteChar: string;
}[] = [
	{
		title: 'an empty string',
		line: '',
		args: [],
		quoteChar: '',
	},
	{
		title: 'a long string',
		line: 'foo',
		args: ['foo'],
		quoteChar: '',
	},
	{
		title: 'a string with single spaces',
		line: 'foo bar',
		args: ['foo', 'bar'],
		quoteChar: '',
	},
	{
		title: 'a string with leading and trailing whitespace',
		line: '  foo bar  ',
		args: ['foo', 'bar'],
		quoteChar: '',
	},
	{
		title: 'a string with double-quoted args',
		line: '"foo" "bar"',
		args: ['foo', 'bar'],
		quoteChar: '',
	},
	{
		title: 'a string with double-quoted args with single quotes',
		line: `"'"`,
		args: [`'`],
		quoteChar: '',
	},
	{
		title: 'a string with single-quoted args with double quotes',
		line: `'"'`,
		args: ['"'],
		quoteChar: '',
	},
	{
		title: 'a string with spaces and an unterminated single quote',
		line: `'{"foo": "bar"}`,
		args: ['{"foo": "bar"}'],
		quoteChar: "'",
	},
	{
		title: 'a string with an unterminated double quote',
		line: `"foo`,
		args: ['foo'],
		quoteChar: '"',
	},
];

describe(`${splitCommandLine.name} correctly splits`, () => {
	splitData.forEach(({ title, line, args, quoteChar }) => {
		it(title, () => {
			const result = splitCommandLine(line);
			expect(result.args).toEqual(args);
			expect(result.quoteChar).toEqual(quoteChar);
		});
	});
});
