import { ICliTree } from './cli-tree';
import { CLI_COMMAND } from './cli-command';
import { ICliCommandGroup, CLI_COMMAND_GROUP } from './cli-command-group';
import { TTwoColumnTableRow } from './two-column-table';
import {
	DescriptionText,
	ICliDescriptionFunctionInput,
} from './cli-description';
/** [command path, description] */

export function UsageSubcommandRows(
	commandGroup: ICliCommandGroup,
	input: ICliDescriptionFunctionInput,
): TTwoColumnTableRow[] {
	return RecursiveUsageSubcommandRows(commandGroup, '', input);
}

function RecursiveUsageSubcommandRows(
	current: ICliTree['current'],
	path: string,
	options: ICliDescriptionFunctionInput,
): TTwoColumnTableRow[] {
	if (current.hidden && path.length > 0) {
		// We've walked to a hidden tree. When path.length === 0 the user has
		// specifically invoked a hidden tree in which case we still want to show
		// them the usage.
		return [];
	}

	if (current.kind === CLI_COMMAND) {
		const text = DescriptionText(current.description, {
			ansi: options.ansi,
		});
		return [[path, text]];
	}

	if (current.kind === CLI_COMMAND_GROUP) {
		const subcommandsForUsage: TTwoColumnTableRow[] = [];
		for (const subcommand of current.subcommands) {
			subcommandsForUsage.push(
				...RecursiveUsageSubcommandRows(
					subcommand,
					path ? `${path} ${subcommand.name}` : subcommand.name,
					options,
				),
			);
		}
		return subcommandsForUsage;
	}

	throw new Error('Unexpected kind');
}
