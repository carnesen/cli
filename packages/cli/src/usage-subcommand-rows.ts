import { CliTree } from './cli-tree';
import { CLI_COMMAND } from './cli-command';
import { ICliCommandGroup, CLI_COMMAND_GROUP } from './cli-command-group';
import { TTwoColumnTableRow } from './two-column-table';
import {
	descriptionTextFactory,
	CliDescriptionFunctionInput,
} from './cli-description';
/** [command path, description] */

export function usageSubcommandRowsFactory(
	commandGroup: ICliCommandGroup,
	input: CliDescriptionFunctionInput,
): TTwoColumnTableRow[] {
	return recursiveUsageSubcommandRows(commandGroup, '', input);
}

function recursiveUsageSubcommandRows(
	current: CliTree['current'],
	path: string,
	input: CliDescriptionFunctionInput,
): TTwoColumnTableRow[] {
	if (current.hidden && path.length > 0) {
		// We've walked to a hidden tree. When path.length === 0 the user has
		// specifically invoked a hidden tree in which case we still want to show
		// them the usage.
		return [];
	}

	if (current.kind === CLI_COMMAND) {
		const text = descriptionTextFactory(current.description, input);
		return [[path, text]];
	}

	if (current.kind === CLI_COMMAND_GROUP) {
		const subcommandsForUsage: TTwoColumnTableRow[] = [];
		for (const subcommand of current.subcommands) {
			subcommandsForUsage.push(
				...recursiveUsageSubcommandRows(
					subcommand,
					path ? `${path} ${subcommand.name}` : subcommand.name,
					input,
				),
			);
		}
		return subcommandsForUsage;
	}

	throw new Error('Unexpected kind');
}
