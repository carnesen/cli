import { CommandLine } from '.';

const delData: {
	title: string;
	line: string;
	index?: number;
	result: boolean;
}[] = [
	{
		title: 'an empty string',
		line: '',
		result: false,
	},
	{
		title: 'a long string',
		line: 'bar',
		result: true,
	},
	{
		title: 'a string with leading and trailing whitespace',
		line: 'bar',
		index: 1,
		result: true,
	},
];

describe(`${CommandLine.name}#del returns the expected result`, () => {
	delData.forEach(({ title, line, index, result }) => {
		it(title, () => {
			const commandLine = new CommandLine(line, index);
			expect(commandLine.del()).toEqual(result);
		});
	});
});
