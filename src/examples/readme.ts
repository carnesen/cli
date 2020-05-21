import { CliLeaf } from '../cli-leaf';
import { CliNumberArrayArgParser } from '../cli-number-array-arg-parser';
import { CliFlagArgParser } from '../cli-flag-arg-parser';
import { runCliAndExit } from '../run-cli-and-exit';

export const multiplyCliLeaf = CliLeaf({
  name: 'multiply',
  description: 'Multiply numbers and print the result',
  positionalArgParser: CliNumberArrayArgParser({ required: true }),
  namedArgParsers: {
    squared: CliFlagArgParser({
      description: 'Square the result before printing it',
    }),
  },
  action(numbers, { squared }) {
    const multiplied = numbers.reduce((a, b) => a * b, 1);
    if (squared) {
      return multiplied * multiplied;
    }
    return multiplied;
  },
});

if (require.main === module) {
  runCliAndExit(multiplyCliLeaf);
}
