import { root } from '../hidden-leaf';
import { RunCli } from '../../run-cli';

const cli = RunCli(root);

describe(root.name, () => {
  it('has a hidden leaf "hidden-echo"', async () => {
    expect(await cli('hidden-echo', 'foo')).toBe('foo');
  });
});
