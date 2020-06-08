import { hardWrap } from './hard-wrap';

const data: {
  description?: string;
  indentation?: string;
  maxLineLength?: number;
  expectedResult: ReturnType<typeof hardWrap>;
}[] = [
  {
    description: '',
    expectedResult: [],
  },
  {
    description: undefined,
    expectedResult: [],
  },
  {
    description: `This is the
                  best CLI ever.
                  
                  I'm serious.`,
    expectedResult: ['This is the best CLI ever.', '', "I'm serious."],
  },
  {
    description: 'Test indentation',
    indentation: ' : ',
    expectedResult: [' : Test indentation'],
  },
  {
    description: `This is a line longer than the max width.`,
    expectedResult: ['This is a line longer than the', 'max width.'],
    maxLineLength: 30,
  },
  {
    description: `This is a line longer than the max width.`,
    expectedResult: ['   This is a line longer than', '   the max width.'],
    maxLineLength: 30,
    indentation: '   ',
  },
  {
    description: `
    Test trims leading and trailing whitespace
    `,
    expectedResult: ['Test trims leading and trailing whitespace'],
  },
  {
    description: `
    Let's try double empty lines


    And now another paragraph`,
    expectedResult: ["Let's try double empty lines", '', 'And now another paragraph'],
  },
];

describe(hardWrap.name, () => {
  for (const { description, expectedResult, maxLineLength, indentation } of data) {
    it(`${JSON.stringify(description)} ==> ${JSON.stringify(expectedResult)}`, () => {
      const result = hardWrap(description, maxLineLength, indentation);
      expect(result).toEqual(expectedResult);
    });
  }
});
