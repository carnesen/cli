import { CliBranch } from '@carnesen/cli';
import { echoCommand } from './echo-command';
import { echoHiddenCommand } from './echo-hidden-command';
import { echoPizzaCommand } from './echo-pizza-command';

export const hiddenBranch = CliBranch({
	name: 'hidden-branch',
	description: `
		This is a command tree branch that has hidden=true. It does not show up
		in the list of "subcommands", but it is otherwise fully functional.`,
	hidden: true,
	subcommands: [echoCommand],
});

export const nonHiddenBranch = CliBranch({
	name: 'normal-branch',
	description: `
    This is a normal non-hidden command tree branch that shows up in
    command-line usage documentation like you'd expect`,
	subcommands: [echoCommand],
});

export const hidingBranch = CliBranch({
	name: 'hiding',
	description: `
		This branch demonstrates the use of the "hidden" flag for commands,
		branches, and argument groups.
		
		This branch has a hidden subcommand "${echoHiddenCommand.name}". Hidden
		commands are just like non-hidden ones except they don't show up in
		auto-generated command-line usage documentation unless the user invokes
		that subcommand specifically as e.g. (try it!):
		
		${echoHiddenCommand.name} --help
		
		This branch has a hidden sub-branch "${hiddenBranch.name}". Hidden
		branches are just like normal branches except they don't show up in
		auto-generated command-line usage documentation unless the user navigates
		to them specifically as e.g. (try it!):

		${hiddenBranch.name} --help

		Notice that neither "${echoHiddenCommand.name}" nor "${hiddenBranch.name}"
		appear in the auto-generated subcommand list.

	`,
	subcommands: [
		echoHiddenCommand,
		echoPizzaCommand,
		hiddenBranch,
		nonHiddenBranch,
	],
});
