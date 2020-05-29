import { findCliLeaf } from './find-cli-leaf';
import { CliBranch } from './cli-branch';
import { CliLeaf } from './cli-leaf';

const leaf = CliLeaf({
  name: 'echo',
  action(foo) {
    return foo;
  },
});

const branch = CliBranch({
  name: 'cli',
  subcommands: [leaf],
});

describe(findCliLeaf.name, () => {
  it('accumulates command linked list', () => {
    const [leafStack, args] = findCliLeaf(
      {
        current: branch,
        parents: [],
      },
      ['echo', 'foo'],
    );
    expect(leafStack.current).toBe(leaf);
    expect(leafStack.parents[0]).toBe(branch);
    expect(args).toEqual(['foo']);
  });
});
