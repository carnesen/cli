import { runAndCatchSync } from '@carnesen/run-and-catch';
import { usageFactory } from '../usage-string';
import { CliStringArgGroup } from '../arg-group-factories/cli-string-arg-group';
import { CCliCommand } from '../c-cli-command';
import { CCliTree } from '../c-cli-tree';
import { UsageOptions } from '../usage-options';
import { cCliColorFactory } from '../c-cli-color-factory';
import { CCliCommandGroup } from '../c-cli-command-group';

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

const current = CCliCommand.create({
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

const commandGroup = CCliCommandGroup.create({
	name: 'cli',
	description: 'This is a CLI',
	subcommands: [current],
});

const options: UsageOptions = {
	color: cCliColorFactory(),
	columns: 100,
	indentation: '',
};

describe(usageFactory.name, () => {
	it('Creates a usage string for a command group', () => {
		const usageString = usageFactory(
			{ current: commandGroup, parents: [] },
			options,
		);
		expect(usageString).toMatchSnapshot();
	});

	it('Creates a usage string for a command without a parent', () => {
		const usageString = usageFactory(
			{
				current: current as CCliTree['current'],
				parents: [],
			},
			options,
		);
		expect(usageString).toMatch(DESCRIPTION);
		expect(usageString).toMatchSnapshot();
	});

	it('Creates a usage string for a command without a parent command group', () => {
		const usageString = usageFactory(
			{
				current: current as CCliTree['current'],
				parents: [commandGroup],
			},
			options,
		);
		expect(usageString).toMatchSnapshot();
	});

	it('Does not write usage for named argGroups if there are none', () => {
		const fooCommand = CCliCommand.create({ name: 'foo', action() {} });
		const usageString = usageFactory(
			{ current: fooCommand, parents: [] },
			options,
		);
		expect(usageString).toMatchSnapshot();
	});

	it('Throws "unexpected kind" if passed an object of unknown kind', () => {
		const exception = runAndCatchSync(
			usageFactory,
			{ current: {} } as any,
			{} as any,
		);
		expect(exception.message).toMatch(/unexpected kind/i);
	});
});
