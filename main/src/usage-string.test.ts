import { UsageString } from './usage-string';
import { CliBranch } from './cli-branch';
import { CliStringArgGroup } from './arg-group-factories/cli-string-arg-group';
import { CliCommand } from './cli-command';
import { ICliNode } from './cli-tree';

const messageArgGroup = CliStringArgGroup({
	description: 'A string message please',
});
const positionalArgGroup = CliStringArgGroup({
	description: 'A word',
	placeholder: '<word>',
});
const escapedArgGroup = CliStringArgGroup({
	description: 'Another word',
	required: true,
});

const current = CliCommand({
	name: 'echo',
	positionalArgGroup,
	namedArgGroups: {
		message: messageArgGroup,
	},
	escapedArgGroup,
	action(foo) {
		return foo;
	},
});

const branch = CliBranch({
	name: 'cli',
	description: 'This is a CLI',
	children: [current],
});

describe(UsageString.name, () => {
	it('Creates a usage string for a branch', () => {
		const usageString = UsageString({ current: branch, parents: [] });
		expect(usageString).toMatchSnapshot();
	});

	it('Creates a usage string for a command without a parent', () => {
		const usageString = UsageString({
			current: current as ICliNode['current'],
			parents: [],
		});
		expect(usageString).toMatch(messageArgGroup.description!);
		expect(usageString).toMatchSnapshot();
	});

	it('Creates a usage string for a command without a parent branch', () => {
		const usageString = UsageString({
			current: current as ICliNode['current'],
			parents: [branch],
		});
		expect(usageString).toMatchSnapshot();
	});

	it('Does not write usage for named argGroups if there are none', () => {
		const fooCommand = CliCommand({ name: 'foo', action() {} });
		const usageString = UsageString({ current: fooCommand, parents: [] });
		expect(usageString).toMatchSnapshot();
	});
});
