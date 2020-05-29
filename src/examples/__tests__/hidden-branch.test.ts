import { root } from '../hidden-branch';
import { RunCli } from '../../run-cli';

const cli = RunCli(root);

describe(root.name, () => {
  it('has a command "secret echo"', async () => {
    expect(await cli('secret', 'echo', 'foo')).toBe('foo');
  });
});
