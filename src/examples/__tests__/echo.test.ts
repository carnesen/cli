import { echoCliCommand } from '../echo';
import { RunCli } from '../../run-cli';

describe(echoCliCommand.name, () => {
  it('" "-joins and returns the provided positional args', async () => {
    expect(await RunCli(echoCliCommand)('foo', 'bar', 'baz')).toBe('foo bar baz');
  });
});
