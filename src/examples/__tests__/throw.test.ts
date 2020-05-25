import { runAndCatch } from '@carnesen/run-and-catch';

import { root } from '../throw';
import { CliArgRunner } from '../../cli-arg-runner';

const cli = CliArgRunner(root);

describe('throw CLI', () => {
  it('throws', async () => {
    const ex = await runAndCatch(cli, '--message', 'foo');
    expect(ex.message).toBe('foo');
  });
});
