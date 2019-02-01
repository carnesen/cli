import { option, leaf, cli } from '..';

export const nullable = leaf({
  commandName: 'nullable',
  options: {
    nullable: option({
      typeName: 'string',
      description: 'An option with "nullable" set to true',
      nullable: true,
    }),
  },
  action({ nullable }) {
    if (nullable === null) {
      // $ExpectType null
      nullable;
      return 'the nullable arg is null';
    }
    return nullable;
  },
});

if (module === require.main) {
  cli(nullable)();
}
