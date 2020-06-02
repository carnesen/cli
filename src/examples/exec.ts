import { execSync } from 'child_process';
import { CliStringArgParser } from '../arg-parsers/cli-string-arg-parser';
import { CliCommand } from '../cli-command';
import { CliStringArrayArgParser } from '../arg-parsers/cli-string-array-arg-parser';
import { runCliAndExit } from '../run-cli-and-exit';

export const execCliCommand = CliCommand({
  name: 'exec',
  description: 'Run a shell command',
  namedArgParsers: {
    cwd: CliStringArgParser({
      placeholder: '<path>',
      description: 'Current working directory of the child process',
    }),
  },
  escapedArgParser: CliStringArrayArgParser({
    required: true,
    placeholder: '<command> [<arguments>]',
  }),
  action(_, { cwd }, escaped) {
    const command = escaped.join(' ');
    const output = execSync(command, { cwd, encoding: 'utf8' });
    return output;
  },
});

if (module === require.main) {
  runCliAndExit(execCliCommand);
}
