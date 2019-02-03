import { nullable } from '../nullable';
import { testCli, testCliThrows } from '../../factories';

const cli = testCli(nullable);
const cliThrows = testCliThrows(nullable);

describe(`${nullable.commandName}`, () => {
  it('sets the value of the named arg to null if no value is provided', async () => {
    expect(await cli()).toMatch('the nullable arg is null');
  });
  it('usage: wraps the option string in square brackets', async () => {
    expect(await cliThrows('--help')).toMatch('[--nullable <str>]');
  });
});
