import { UsageString } from './usage-string';
import { CliBranch } from './cli-branch';
import { CliStringValuedParser } from './arg-parsers/cli-string-arg-parser';
import { CliCommand } from './cli-command';
import { BranchOrCommand } from './cli-node';

const messageValuedParser = CliStringValuedParser({
  description: 'A string message please',
});
const positionalValuedParser = CliStringValuedParser({
  description: 'A word',
  placeholder: '<word>',
});
const escapedValuedParser = CliStringValuedParser({
  description: 'Another word',
  required: true,
});

const command = CliCommand({
  name: 'echo',
  positionalParser: positionalValuedParser,
  namedParsers: {
    message: messageValuedParser,
  },
  escapedParser: escapedValuedParser,
  action(foo) {
    return foo;
  },
});

const branch = CliBranch({
  name: 'cli',
  description: 'This is a CLI',
  children: [command],
});

describe(UsageString.name, () => {
  it('Creates a usage string for a branch', () => {
    const usageString = UsageString({ current: branch, parents: [] });
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a command without a parent', () => {
    const usageString = UsageString({ current: command as BranchOrCommand, parents: [] });
    expect(usageString).toMatch(messageValuedParser.description!);
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a command without a parent branch', () => {
    const usageString = UsageString({
      current: command as BranchOrCommand,
      parents: [branch],
    });
    expect(usageString).toMatchSnapshot();
  });

  it('Does not write usage for named parsers if there are none', () => {
    const fooCommand = CliCommand({ name: 'foo', action() {} });
    const usageString = UsageString({ current: fooCommand, parents: [] });
    expect(usageString).toMatchSnapshot();
  });
});
