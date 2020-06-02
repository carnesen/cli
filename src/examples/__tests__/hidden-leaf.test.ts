import { root } from '../hidden-command';
import { RunCli } from '../../run-cli';

const cli = RunCli(root);

describe(root.name, () => {
  it('has a hidden command "hidden-echo"', async () => {
    expect(await cli('hidden-echo', 'foo')).toBe('foo');
  });
});
