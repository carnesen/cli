import { hardWrapText } from '../hard-wrap-text';

const data: {
	text?: string;
	indentation?: string;
	maxLineLength?: number;
	maxParagraphs?: number;
	lines: ReturnType<typeof hardWrapText>;
}[] = [
	{
		text: '',
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
		maxLineLength: 30,
	},
	{
		text: `This is a line longer than the max width.`,
		lines: ['   This is a line longer than', '   the max width.'],
		maxLineLength: 30,
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
];

describe(hardWrapText.name, () => {
	for (const {
		text: description,
		lines: expectedResult,
		maxLineLength,
		indentation,
		maxParagraphs,
	} of data) {
		it(`${JSON.stringify(description)} ==> ${JSON.stringify(
			expectedResult,
		)}`, () => {
			const result = hardWrapText(description, {
				maxLineLength,
				indentation,
				maxParagraphs,
			});
			expect(result).toEqual(expectedResult);
		});
	}
});
