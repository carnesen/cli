import { CommandLine } from '..';

const splitData: {
	title: string;
	line: string;
	args: string[];
}[] = [
	{
		title: 'an empty string',
		line: '',
		args: [],
	},
	{
		title: 'a long string',
		line: 'foo',
		args: ['foo'],
	},
	{
		title: 'a string with single spaces',
		line: 'foo bar',
		args: ['foo', 'bar'],
	},
	{
		title: 'a string with leading and trailing whitespace',
		line: '  foo bar  ',
		args: ['foo', 'bar'],
	},
	{
		title: 'a string with double-quoted args',
		line: '"foo" "bar"',
		args: ['foo', 'bar'],
	},
	{
		title: 'a string with double-quoted args with single quotes',
		line: `"'"`,
		args: [`'`],
	},
	{
		title: 'a string with single-quoted args with double quotes',
		line: `'"'`,
		args: ['"'],
	},
	{
		title: 'a string with spaces',
		line: `'{"foo": "bar"}`,
		args: ['{"foo": "bar"}'],
	},
];

const commandLine = new CommandLine();

describe(`${CommandLine.name}#${commandLine.splitIntoArgs.name} returns the expected result`, () => {
	splitData.forEach(({ title, line, args: words }) => {
		it(title, () => {
			commandLine.setValue(line);
			expect(commandLine.splitIntoArgs().args).toEqual(words);
		});
	});
});
