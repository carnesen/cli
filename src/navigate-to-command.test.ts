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
  subcommands: [command],
});

describe(navigateToCommand.name, () => {
  it('accumulates command linked list', () => {
    const [commandStack, args] = navigateToCommand(branch, ['echo', 'foo']);
    expect(commandStack.current).toBe(command);
    expect(commandStack.parents[0]).toBe(branch);
    expect(args).toEqual(['foo']);
  });
});
