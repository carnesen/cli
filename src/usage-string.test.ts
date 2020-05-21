import { UsageString } from './usage-string';
import { CliBranch } from './cli-branch';
import { CliStringArgParser } from './cli-string-arg-parser';
import { CliLeaf } from './cli-leaf';
import { Command } from './types';
import { RED_ERROR } from './constants';

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

const root = CliBranch({
  name: 'cli',
  description: 'This is a CLI',
  subcommands: [leaf],
});

describe(UsageString.name, () => {
  it('Creates a usage string for a branch', () => {
    root.next = undefined;
    const usageString = UsageString(root);
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a leaf', () => {
    root.next = leaf;
    const usageString = UsageString(root);
    expect(usageString).toMatch(messageArgParser.description!);
    expect(usageString).toMatchSnapshot();
  });

  it('Creates a usage string for a leaf without a parent branch', () => {
    const usageString = UsageString(leaf as Command);
    expect(usageString).toMatchSnapshot();
  });

  it('Writes an error message at the end if one is provided', () => {
    const usageString = UsageString(root, 'foo');
    expect(usageString.endsWith(`${RED_ERROR} foo`)).toBe(true);
  });

  it('Does not write usage for named argParsers if there are none', () => {
    const usageString = UsageString(CliLeaf({ name: 'foo', action() {} }));
    expect(UsageString(CliLeaf({ name: 'foo', action() {}, namedArgParsers: {} }))).toBe(
      usageString,
    );
    expect(usageString).toMatchSnapshot();
  });
});
