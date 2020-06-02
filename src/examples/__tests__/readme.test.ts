import { multiplyCliCommand } from '../readme';
import { RunCli } from '../../run-cli';

const cli = RunCli(multiplyCliCommand);

describe('readme example', () => {
  it('multiplies the provided numbers together', async () => {
    expect(await cli('1', '2', '3')).toBe(6);
  });
});
