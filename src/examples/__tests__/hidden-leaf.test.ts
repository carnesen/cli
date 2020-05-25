import { root } from '../hidden-leaf';
import { CliArgRunner } from '../../cli-arg-runner';

const cli = CliArgRunner(root);

describe(root.name, () => {
  it('has a hidden leaf "hidden-echo"', async () => {
    expect(await cli('hidden-echo', 'foo')).toBe('foo');
  });
});
