import { c } from '@carnesen/cli';
import { autocomplete } from '../autocomplete';

const oneOfArgGroup = c.stringChoice({
	choices: ['foo', 'bar', 'baz'],
	optional: true,
});

const command = c.command({
	name: 'command',
	positionalArgGroup: oneOfArgGroup,
	namedArgGroups: {
		name: oneOfArgGroup,
		str: c.string(),
	},
	doubleDashArgGroup: oneOfArgGroup,
	action() {},
});

const emptyCommand = c.command({
	name: 'empty',
	action() {},
});

const requiredPositionalArgGroupCommand = c.command({
	name: 'required-positional-arg-group-command',
	action() {},
	positionalArgGroup: c.stringChoice({
		choices: ['foo', 'bar'],
	}),
	doubleDashArgGroup: oneOfArgGroup,
});

const commandGroup0 = c.commandGroup({
	name: 'group-0',
	subcommands: [command],
});
const commandGroup1 = c.commandGroup({
	name: 'group-1',
	subcommands: [commandGroup0, command],
});

const root = c.commandGroup({
	name: 'root',
	subcommands: [
		commandGroup0,
		commandGroup1,
		command,
		emptyCommand,
		requiredPositionalArgGroupCommand,
	],
});

const data: {
	title: string;
	args: string[];
	search: string;
	expectedCompletions: string[];
}[] = [
	{
		title: 'top-level subcommand names from empty search from root',
		args: [],
		search: '',
		expectedCompletions: [
			'group-0',
			'group-1',
			'command',
			'empty',
			requiredPositionalArgGroupCommand.name,
		],
	},
	{
		title: 'nothing if they have already given --help',
		args: ['--help'],
		search: '',
		expectedCompletions: [],
	},
	{
		title: 'the longest leading substring if there are multiple matches',
		args: [],
		search: 'g',
		expectedCompletions: ['roup-'],
	},
	{
		title: 'a unique subcommand name matching the search if there is one',
		args: [],
		search: 'c',
		expectedCompletions: ['ommand '],
	},
	{
		title: 'a space if the search is a 100% match',
		args: [],
		search: 'group-0',
		expectedCompletions: [' '],
	},
	{
		title: "no completions if the args don't match a command",
		args: ['foo'],
		search: '',
		expectedCompletions: [],
	},
	{
		title: "no completions if the search doesn't match a command",
		args: [],
		search: 'foo',
		expectedCompletions: [],
	},
	{
		title: 'the command name and space if there is only one command',
		args: ['group-0'],
		search: '',
		expectedCompletions: ['command '],
	},
	{
		title: 'the matching command name even deep two command groups',
		args: ['group-1', 'group-0'],
		search: 'c',
		expectedCompletions: ['ommand '],
	},
	{
		title:
			'completions taken from positional, named, and double-dash arguments',
		args: ['command'],
		search: '',
		expectedCompletions: [
			'--',
			'--name',
			'--str',
			'--help',
			'foo',
			'bar',
			'baz',
		],
	},
	{
		title:
			'the completions of the double-dash arg group if we are at the start of it',
		args: ['command', '--'],
		search: '',
		expectedCompletions: ['foo', 'bar', 'baz'],
	},
	{
		title: 'nothing if we are past the start of the double-dash arg group',
		args: ['command', '--', 'foo'],
		search: 'b',
		expectedCompletions: [],
	},
	{
		title: 'unique match in positional arg group',
		args: ['command'],
		search: 'f',
		expectedCompletions: ['oo '],
	},
	{
		title: '"" and named argument separators when search is "--"',
		args: ['command'],
		search: '--',
		expectedCompletions: ['', 'name', 'str', 'help'],
	},
	{
		title: 'the named arg group name completion on a valid search like "--n"',
		args: ['command'],
		search: '--n',
		expectedCompletions: ['ame '],
	},
	{
		title: 'nothing on a invalid search like "--xz"',
		args: ['command'],
		search: '--xz',
		expectedCompletions: [],
	},
	{
		title: 'the named arg group completions with empty search',
		args: ['command', '--name'],
		search: '',
		expectedCompletions: ['foo', 'bar', 'baz'],
	},
	{
		title: 'the named arg group completions with search matching multiple',
		args: ['command', '--name'],
		search: 'b',
		expectedCompletions: ['a'],
	},
	{
		title: 'the named arg group completions with search matching unique',
		args: ['command', '--name'],
		search: 'bar',
		expectedCompletions: [' '],
	},
	{
		title:
			'nothing if the previous argument is a bogus named argument separator',
		args: ['command', '--lame'],
		search: 'bar',
		expectedCompletions: [],
	},
	{
		title:
			'the named arg group completions with no _suggest support in the arg group',
		args: ['command', '--str'],
		search: 'bar',
		expectedCompletions: [],
	},
	{
		title: "nothing if they're in a situation we don't autocomplete for",
		args: ['command', 'foo'],
		search: 'bar',
		expectedCompletions: [],
	},
	{
		title: "nothing if they're after --name in a command without named args",
		args: ['empty', '--foo'],
		search: 'bar',
		expectedCompletions: [],
	},
	{
		title: 'completions for only the positional arg group if it is required',
		args: [requiredPositionalArgGroupCommand.name],
		search: '',
		expectedCompletions: ['foo', 'bar'],
	},
];

describe(`${autocomplete.name} returns`, () => {
	data.forEach(({ title, args, search, expectedCompletions }) => {
		it(title, () => {
			const completions = autocomplete(root, args, search);
			expect(completions).toEqual(expectedCompletions);
		});
	});
});
