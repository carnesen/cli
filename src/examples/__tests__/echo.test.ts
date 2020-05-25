import { echoCliLeaf } from '../echo';
import { CliArgRunner } from '../../cli-arg-runner';

describe(echoCliLeaf.name, () => {
  it('" "-joins and returns the provided positional args', async () => {
    expect(await CliArgRunner(echoCliLeaf)('foo', 'bar', 'baz')).toBe('foo bar baz');
  });
});
