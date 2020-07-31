import { UsageString } from '../usage-string';
import { CliBranch } from '../cli-branch';
import { CliStringArgGroup } from '../arg-group-factories/cli-string-arg-group';
import { CliCommand } from '../cli-command';
import { ICliTree } from '../cli-tree';
import { IUsageOptions } from '../usage-options';
import { CliAnsi } from '../cli-ansi';

const DESCRIPTION = 'A string message please';

const messageArgGroup = CliStringArgGroup({
	description: DESCRIPTION,
});
const positionalArgGroup = CliStringArgGroup({
	description: 'A word',
	placeholder: '<word>',
});
const doubleDashArgGroup = CliStringArgGroup({
	description: 'Another word',
	required: true,
});

const current = CliCommand({
	name: 'echo',
	positionalArgGroup,
	namedArgGroups: {
		message: messageArgGroup,
	},
	doubleDashArgGroup,
	action(foo) {
		return foo;
	},
});

const branch = CliBranch({
	name: 'cli',
	description: 'This is a CLI',
	subcommands: [current],
});

const options: IUsageOptions = {
	ansi: CliAnsi(),
	columns: 100,
	indentation: '',
};

describe(UsageString.name, () => {
	it('Creates a usage string for a branch', () => {
		const usageString = UsageString({ current: branch, parents: [] }, options);
		expect(usageString).toMatchSnapshot();
	});

	it('Creates a usage string for a command without a parent', () => {
		const usageString = UsageString(
			{
				current: current as ICliTree['current'],
				parents: [],
			},
			options,
		);
		expect(usageString).toMatch(DESCRIPTION);
		expect(usageString).toMatchSnapshot();
	});

	it('Creates a usage string for a command without a parent branch', () => {
		const usageString = UsageString(
			{
				current: current as ICliTree['current'],
				parents: [branch],
			},
			options,
		);
		expect(usageString).toMatchSnapshot();
	});

	it('Does not write usage for named argGroups if there are none', () => {
		const fooCommand = CliCommand({ name: 'foo', action() {} });
		const usageString = UsageString(
			{ current: fooCommand, parents: [] },
			options,
		);
		expect(usageString).toMatchSnapshot();
	});
});
