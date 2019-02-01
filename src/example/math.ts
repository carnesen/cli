import { option, leaf, cli, branch } from '..';

export const math = branch({
  commandName: 'math',
  description: 'Do mathematical operations',
  subcommands: [
    leaf({
      commandName: 'multiply',
      description: 'Multiply numbers',
      options: {
        numbers: option({
          typeName: 'number[]',
          nullable: false,
        }),
      },
      action({ numbers }) {
        return numbers.reduce((a, b) => a * b, 1);
      },
    }),
    leaf({
      commandName: 'square',
      description: 'Square a number',
      options: {
        number: option({
          description: 'A number to square',
          typeName: 'number',
          nullable: false,
        }),
      },
      action({ number }) {
        return number * number;
      },
    }),
  ],
});

if (module === require.main) {
  cli(math)();
}
