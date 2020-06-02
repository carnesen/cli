import { CliCommand } from '../cli-command';
import { CliNumberArrayArgParser } from '../arg-parsers/cli-number-array-arg-parser';
import { runCliAndExit } from '../run-cli-and-exit';

export const multiplyCliCommand = CliCommand({
  name: 'multiply',
  description: 'Multiply numbers and print the result',
  positionalArgParser: CliNumberArrayArgParser({ required: true }),
  action(numbers) {
    return numbers.reduce((a, b) => a * b, 1);
  },
});

if (require.main === module) {
  runCliAndExit(multiplyCliCommand);
}
