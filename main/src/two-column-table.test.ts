import { TwoColumnTable, TwoColumnTableRow } from './two-column-table';

type Datum = {
  rows: TwoColumnTableRow[];
  indentation?: string;
  expectedResult: string[];
};
const data: Datum[] = [
  { rows: [], expectedResult: [] },
  { rows: [['foo', '']], expectedResult: ['foo'] },
  { rows: [['foo', '']], indentation: '   ', expectedResult: ['   foo'] },
  { rows: [['foo', 'bar']], expectedResult: ['foo : bar'] },
  {
    rows: [['foo', 'bar\n\n baz']],
    expectedResult: ['foo : bar', '      ', '      baz'],
  },
];
describe(TwoColumnTable.name, () => {
  for (const { rows, expectedResult, indentation } of data) {
    it('Creates a usage string for a branch', () => {
      const result = TwoColumnTable(rows, undefined, indentation);
      expect(result).toEqual(expectedResult);
    });
  }
});
