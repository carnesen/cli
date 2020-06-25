import {
	CliBranch,
	CliCommand,
	CliOneOfArgGroup,
	CliStringArgGroup,
} from '@carnesen/cli';
import { autocomplete } from './autocomplete';

const oneOfArgGroup = CliOneOfArgGroup({ values: ['foo', 'bar', 'baz'] });

const command = CliCommand({
	name: 'command',
	positionalArgGroup: oneOfArgGroup,
	namedArgGroups: {
		name: oneOfArgGroup,
		str: CliStringArgGroup(),
	},
	escapedArgGroup: oneOfArgGroup,
	action() {},
});

const branch0 = CliBranch({ name: 'branch0', subcommands: [command] });
const branch1 = CliBranch({
	name: 'branch1',
	subcommands: [branch0, command],
});

const root = CliBranch({
	name: 'root',
	subcommands: [branch0, branch1, command],
});

const data: {
	args: string[];
	search: string;
	expectedCompletions: string[];
}[] = [
	{
		args: [],
		search: '',
		expectedCompletions: ['branch0', 'branch1', 'command'],
	},
	{ args: [], search: 'b', expectedCompletions: ['ranch'] },
	{ args: [], search: 'c', expectedCompletions: ['ommand '] },
	{ args: [], search: 'branch0', expectedCompletions: [' '] },
	{ args: ['foo'], search: '', expectedCompletions: [] },
	{ args: [], search: 'foo', expectedCompletions: [] },
	{
		args: ['command'],
		search: '',
		expectedCompletions: ['--', '--name', '--str', 'foo', 'bar', 'baz'],
	},
	{ args: ['branch0'], search: '', expectedCompletions: ['command '] },
	{
		args: ['branch1', 'branch0'],
		search: 'c',
		expectedCompletions: ['ommand '],
	},
	{
		args: ['command'],
		search: '--',
		expectedCompletions: ['', 'name', 'str'],
	},
	{
		args: ['command'],
		search: '--n',
		expectedCompletions: ['ame '],
	},
	{
		args: ['command', '--name'],
		search: '',
		expectedCompletions: ['foo', 'bar', 'baz'],
	},
	{
		args: ['command', '--name'],
		search: 'b',
		expectedCompletions: ['a'],
	},
	{
		args: ['command', '--name'],
		search: 'bar',
		expectedCompletions: [' '],
	},
	{
		args: ['command', '--str'],
		search: 'bar',
		expectedCompletions: [],
	},
];

describe(autocomplete.name, () => {
	data.forEach(({ args, search, expectedCompletions }) => {
		it(`${autocomplete.name}(root, [${args}], ${search}) => ${expectedCompletions}`, () => {
			const completions = autocomplete(root, args, search);
			expect(completions).toEqual(expectedCompletions);
		});
	});
});
