import { CliCommandGroup } from '@carnesen/cli';
import { echoCommand } from './echo-command';
import { echoHiddenCommand } from './echo-hidden-command';
import { echoPizzaCommand } from './echo-pizza-command';

export const hiddenCommandGroup = CliCommandGroup({
	name: 'hidden-command-group',
	description: `
		This is a command group that has hidden=true. It does not show up
		in the list of "subcommands", but it is otherwise fully functional.`,
	hidden: true,
	subcommands: [echoCommand],
});

export const nonHiddenCommandGroup = CliCommandGroup({
	name: 'normal-command-group',
	description: `
    This is a normal non-hidden command group that shows up in
    command-line usage documentation like you'd expect`,
	subcommands: [echoCommand],
});

export const hidingCommandGroup = CliCommandGroup({
	name: 'hiding',
	description: `
		This command group demonstrates the use of the "hidden" flag for commands,
		command groups, and argument groups.
		
		This command group has a hidden subcommand "${echoHiddenCommand.name}". 
		Hidden commands are just like non-hidden ones except they don't show up in
		auto-generated command-line usage documentation unless the user invokes
		that subcommand specifically as e.g. (try it!):
		
		${echoHiddenCommand.name} --help
		
		This command group has a hidden command group underneath it named 
		"${hiddenCommandGroup.name}". Hidden command groups are just like 
		normal command groups except they don't show up in auto-generated 
		command-line usage documentation unless the user navigates to them 
		specifically as e.g. (try it!):

		${hiddenCommandGroup.name} --help

		Notice that neither "${echoHiddenCommand.name}" nor "${hiddenCommandGroup.name}"
		appear in the auto-generated subcommand list.

	`,
	subcommands: [
		echoHiddenCommand,
		echoPizzaCommand,
		hiddenCommandGroup,
		nonHiddenCommandGroup,
	],
});
