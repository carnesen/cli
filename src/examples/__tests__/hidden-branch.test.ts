import { root } from '../hidden-branch';
import { CliArgRunner } from '../../cli-arg-runner';

const cli = CliArgRunner(root);

describe(root.name, () => {
  it('has a command "secret echo"', async () => {
    expect(await cli('secret', 'echo', 'foo')).toBe('foo');
  });
});
