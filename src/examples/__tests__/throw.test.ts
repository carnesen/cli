import { runAndCatch } from '@carnesen/run-and-catch';

import { root } from '../throw';
import { RunCli } from '../../run-cli';

const cli = RunCli(root);

describe('throw CLI', () => {
  it('throws', async () => {
    const ex = await runAndCatch(cli, '--message', 'foo');
    expect(ex.message).toBe('foo');
  });
});
