import { UsageString } from './usage-string';
import { CliBranch } from './cli-branch';
import { CliStringArgParser } from './arg-parsers/cli-string-arg-parser';
import { CliCommand } from './cli-command';
import { BranchOrCommand } from './types';

const messageArgParser = CliStringArgParser({ description: 'A string message please' });
const positionalArgParser = CliStringArgParser({
  description: 'A word',
  placeholder: '<word>',
});
const escapedArgParser = CliStringArgParser({
  description: 'Another word',
  required: true,
});

const command = CliCommand({
  name: 'echo',
  positionalArgParser,
  namedArgParsers: {
    message: messageArgParser,
  },
  escapedArgParser,
  action(foo) {
    return foo;
  },
});

const branch = CliBranch({
  name: 'cli',
  description: 'This is a CLI',
  subcommands: [command],
});

describe(UsageString.name, () => {
  it('Creates a usage string for a branch', () => {
    const usageString = UsageString({ current: branch, parents: [] });
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a command without a parent', () => {
    const usageString = UsageString({ current: command as BranchOrCommand, parents: [] });
    expect(usageString).toMatch(messageArgParser.description!);
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a command without a parent branch', () => {
    const usageString = UsageString({
      current: command as BranchOrCommand,
      parents: [branch],
    });
    expect(usageString).toMatchSnapshot();
  });

  it('Does not write usage for named argParsers if there are none', () => {
    const fooCommand = CliCommand({ name: 'foo', action() {} });
    const usageString = UsageString({ current: fooCommand, parents: [] });
    expect(usageString).toMatchSnapshot();
  });
});
