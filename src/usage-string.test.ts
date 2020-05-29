import { UsageString } from './usage-string';
import { CliBranch } from './cli-branch';
import { CliStringArgParser } from './arg-parser-factories/cli-string-arg-parser';
import { CliLeaf } from './cli-leaf';
import { Command } from './types';

const messageArgParser = CliStringArgParser({ description: 'A string message please' });
const positionalArgParser = CliStringArgParser({
  description: 'A word',
  placeholder: '<word>',
});
const escapedArgParser = CliStringArgParser({
  description: 'Another word',
  required: true,
});

const leaf = CliLeaf({
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
  subcommands: [leaf],
});

describe(UsageString.name, () => {
  it('Creates a usage string for a branch', () => {
    const usageString = UsageString({ current: branch, parents: [] });
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a leaf without a parent', () => {
    const usageString = UsageString({ current: leaf as Command, parents: [] });
    expect(usageString).toMatch(messageArgParser.description!);
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a leaf without a parent branch', () => {
    const usageString = UsageString({
      current: leaf as Command,
      parents: [branch],
    });
    expect(usageString).toMatchSnapshot();
  });

  it('Does not write usage for named argParsers if there are none', () => {
    const fooLeaf = CliLeaf({ name: 'foo', action() {} });
    const usageString = UsageString({ current: fooLeaf, parents: [] });
    expect(usageString).toMatchSnapshot();
  });
});
