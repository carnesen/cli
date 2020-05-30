import { navigateToLeaf } from './navigate-to-leaf';
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

describe(navigateToLeaf.name, () => {
  it('accumulates command linked list', () => {
    const [leafStack, args] = navigateToLeaf(branch, ['echo', 'foo']);
    expect(leafStack.current).toBe(leaf);
    expect(leafStack.parents[0]).toBe(branch);
    expect(args).toEqual(['foo']);
  });
});
