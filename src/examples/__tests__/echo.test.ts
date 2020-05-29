import { echoCliLeaf } from '../echo';
import { RunCli } from '../../run-cli';

describe(echoCliLeaf.name, () => {
  it('" "-joins and returns the provided positional args', async () => {
    expect(await RunCli(echoCliLeaf)('foo', 'bar', 'baz')).toBe('foo bar baz');
  });
});
