import { option, leaf, cli } from '..';

export const getFoo = leaf({
  commandName: 'get-foo',
  options: {
    json: option({
      typeName: 'json',
      nullable: false,
      description: `
        An object with a foo property.
        This is an example of a multi-line option description.`,
      defaultValue: { foo: 'bar' },
    }),
  },
  action({ json }) {
    return json.foo;
  },
});

if (module === require.main) {
  cli(getFoo)();
}
