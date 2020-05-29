import { root } from '../hidden-option';
import { RunCli } from '../../run-cli';

const cli = RunCli(root);

describe(root.name, () => {
  it('normally just echos', async () => {
    expect(await cli('foo')).toEqual('foo');
  });
  it('has a hidden option "--pizza"', async () => {
    expect(await cli('foo', '--pizza')).toMatch('__________');
  });
});
