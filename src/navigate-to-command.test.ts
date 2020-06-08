import { navigateToCommand } from './navigate-to-command';
import { CliBranch } from './cli-branch';
import { CliCommand } from './cli-command';

const command = CliCommand({
  name: 'echo',
  action(foo) {
    return foo;
  },
});

const branch = CliBranch({
  name: 'cli',
  children: [command],
});

describe(navigateToCommand.name, () => {
  it('accumulates command linked list', () => {
    const [node, args] = navigateToCommand(branch, ['echo', 'foo']);
    expect(node.current).toBe(command);
    expect(node.parents[0]).toBe(branch);
    expect(args).toEqual(['foo']);
  });
});
