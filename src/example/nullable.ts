import { option, leaf, cli } from '..';

export const nullable = leaf({
  commandName: 'nullable',
  options: {
    nullable: option({
      typeName: 'string',
      description: 'An option with "nullable" set to true',
      nullable: true,
    }),
    notNullable: option({
      typeName: 'string',
      description: 'An option with "nullable" set to false',
      nullable: false,
    }),
  },
  action({ nullable, notNullable }) {
    if (nullable === null) {
      return nullable;
    }
    return notNullable;
  },
});

if (module === require.main) {
  cli(nullable)();
}
