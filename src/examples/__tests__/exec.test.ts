import { runAndCatch } from '@carnesen/run-and-catch';

import { execCliLeaf } from '../exec';
import { CliArgRunner } from '../../cli-arg-runner';
import { CLI_USAGE_ERROR } from '../../cli-usage-error';

const cliArgRunner = CliArgRunner(execCliLeaf);

describe(execCliLeaf.name, () => {
  it('runs the provided command', async () => {
    const output = await cliArgRunner('--', 'echo', '--foo', '--bar');
    expect(output).toBe('--foo --bar\n');
  });

  it('throws usage', async () => {
    const output = await runAndCatch(cliArgRunner);
    expect(output.code).toBe(CLI_USAGE_ERROR);
  });
});
