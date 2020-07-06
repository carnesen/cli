import { CommandLine } from '.';

const insertData: {
	title: string;
	line: string;
	index?: number;
	str: string;
	result: string;
}[] = [
	{
		title: 'an empty string if the input is an empty string',
		line: 'anything',
		index: 3,
		str: '',
		result: '',
	},
	{
		title: 'the input string if the cursor is at the end of the line',
		line: 'foo',
		str: 'bar',
		result: 'bar',
	},
	{
		title: 'the input string plus the part of the line after the cursor',
		line: 'foo',
		index: 2,
		str: 'bar',
		result: 'baro\b',
	},
];

describe(`${CommandLine.name}#insert returns`, () => {
	insertData.forEach(({ title, str, line, index, result }) => {
		it(title, () => {
			const commandLine = new CommandLine(line, index);
			expect(commandLine.insert(str)).toEqual(result);
		});
	});
});
