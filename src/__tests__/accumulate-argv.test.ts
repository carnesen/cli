import { accumulateArgv } from '../accumulate-argv';

describe(accumulateArgv.name, () => {
  it('parses a string[] into "command"', () => {
    const expectedAccumulatedArgv: ReturnType<typeof accumulateArgv> = {
      maybeCommandNames: ['foo-bar', 'baz'],
      rawNamedArgs: { optionOne: ['foo', 'bar'], anotherArg: [] },
    };
    const argv = ['foo-bar', 'baz', '--option-one', 'foo', 'bar', '--another-arg'];
    const accumulatedArgs = accumulateArgv(argv);
    expect(accumulatedArgs).toEqual(expectedAccumulatedArgv);
  });
});
