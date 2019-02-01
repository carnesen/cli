import { option, leaf, cli } from '..';

export const concat = leaf({
  commandName: 'concat',
  options: {
    strings: option({
      typeName: 'string[]',
      nullable: false,
      description: 'Strings to concat',
    }),
  },
  action({ strings }) {
    return strings.reduce((a, b) => a + b, '');
  },
});

if (module === require.main) {
  cli(concat)();
}
