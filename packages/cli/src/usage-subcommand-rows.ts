import { CCliTree } from './c-cli-tree';
import { TwoColumnTableRow } from './two-column-table';
import {
	renderCCliDescription,
	RenderCCliDescriptionOptions,
} from './c-cli-description';
import { CCliCommandGroup } from './c-cli-command-group';
import { CCliCommand } from './c-cli-command';
/** [command path, description] */

export function usageSubcommandRowsFactory(
	commandGroup: CCliCommandGroup,
	input: RenderCCliDescriptionOptions,
): TwoColumnTableRow[] {
	return recursiveUsageSubcommandRows(commandGroup, '', input);
}

function recursiveUsageSubcommandRows(
	current: CCliTree['current'],
	path: string,
	input: RenderCCliDescriptionOptions,
): TwoColumnTableRow[] {
	if (current.hidden && path.length > 0) {
		// We've walked to a hidden tree. When path.length === 0 the user has
		// specifically invoked a hidden tree in which case we still want to show
		// them the usage.
		return [];
	}

	if (current instanceof CCliCommand) {
		const text = renderCCliDescription(current.description, input);
		return [[path, text]];
	}

	if (current instanceof CCliCommandGroup) {
		const subcommandsForUsage: TwoColumnTableRow[] = [];
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

	throw new Error(
		`Expected instance of ${CCliCommand.name} or ${CCliCommandGroup.name}`,
	);
}
