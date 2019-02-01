import { option, leaf, cli } from '..';

export const invalidTypeName = leaf({
  commandName: 'invalidTypeName',
  options: {
    foo: option({
      nullable: false,
      typeName: 'lenny' as 'string',
    }),
  },
  action({ foo }) {
    return foo;
  },
});

if (module === require.main) {
  cli(invalidTypeName)();
}
