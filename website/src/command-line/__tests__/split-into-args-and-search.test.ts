import { CommandLine } from '..';

const splitIntoArgsAndSearchData: {
	title: string;
	line: string;
	index?: number;
	args: string[];
	search: string;
	singleQuoted: boolean;
	doubleQuoted: boolean;
}[] = [
	{
		title: 'an empty string',
		line: '',
		args: [],
		search: '',
		singleQuoted: false,
		doubleQuoted: false,
	},
	{
		title: 'a normal line with index at the end',
		line: 'foo bar',
		args: ['foo'],
		search: 'bar',
		singleQuoted: false,
		doubleQuoted: false,
	},
	{
		title: 'a normal line with index in the middle ending in a char',
		line: 'foo bar',
		index: 3,
		args: [],
		search: 'foo',
		singleQuoted: false,
		doubleQuoted: false,
	},
	{
		title: 'a normal line with index in the middle ending in a space',
		line: 'foo bar',
		index: 4,
		args: ['foo'],
		search: '',
		singleQuoted: false,
		doubleQuoted: false,
	},
];

describe(`${CommandLine.name}#split returns the expected result`, () => {
	splitIntoArgsAndSearchData.forEach(
		({ title, line, index, args, search, singleQuoted, doubleQuoted }) => {
			it(title, () => {
				const commandLine = new CommandLine(line, index);
				expect(commandLine.splitIntoArgsAndSearch()).toEqual({
					args,
					search,
					singleQuoted,
					doubleQuoted,
				});
			});
		},
	);
});
