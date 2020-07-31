import { reWrapText } from '../re-wrap-text';
import { CliAnsi } from '../cli-ansi';

const data: {
	text?: string;
	indentation?: string;
	columns?: number;
	maxParagraphs?: number;
	lines: ReturnType<typeof reWrapText>;
}[] = [
	{
		text: '',
		lines: [],
	},
	{
		text: ' ',
		lines: [],
	},
	{
		text: undefined,
		lines: [],
	},
	{
		text: `This is the
                  best CLI ever.
                  
                  I'm serious.`,
		lines: ['This is the best CLI ever.', '', "I'm serious."],
	},
	{
		text: 'Test indentation',
		indentation: ' : ',
		lines: [' : Test indentation'],
	},
	{
		text: `This is a line longer than the max width.`,
		lines: ['This is a line longer than the', 'max width.'],
		columns: 30,
	},
	{
		text: `This is a line longer than the max width.`,
		lines: ['   This is a line longer than', '   the max width.'],
		columns: 30,
		indentation: '   ',
	},
	{
		text: `
    Test trims leading and trailing whitespace
    `,
		lines: ['Test trims leading and trailing whitespace'],
	},
	{
		text: `
    Let's try double empty lines


    And now another paragraph`,
		lines: ["Let's try double empty lines", '', 'And now another paragraph'],
	},
	{
		text: `
		A short subject line
		
		A much longer body explanation
		`,
		maxParagraphs: 1,
		lines: ['A short subject line'],
	},
	{
		text: `${CliAnsi(true).red('f ').repeat(3)}`,
		columns: 10,
		lines: [CliAnsi(true).red('f ').repeat(3).trim()],
	},
];

describe(reWrapText.name, () => {
	for (const {
		text: description,
		lines: expectedResult,
		columns,
		indentation,
		maxParagraphs,
	} of data) {
		it(`${JSON.stringify(description)} ==> ${JSON.stringify(
			expectedResult,
		)}`, () => {
			const result = reWrapText(description, {
				columns,
				indentation,
				maxParagraphs,
			});
			expect(result).toEqual(expectedResult);
		});
	}
});
