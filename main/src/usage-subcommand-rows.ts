import { CliNode } from './cli-node';
import { CLI_COMMAND } from './cli-command';
import { ICliBranch, CLI_BRANCH } from './cli-branch';
import { TwoColumnTableRow } from './two-column-table';

/** [command path, description] */

export function UsageSubcommandRows(branch: ICliBranch): TwoColumnTableRow[] {
	return RecursiveUsageSubcommandRows(branch, '');
}

function RecursiveUsageSubcommandRows(
	current: CliNode['current'],
	path: string,
): TwoColumnTableRow[] {
	if (current.hidden && path.length > 0) {
		// We've walked to a hidden node. When path.length === 0 the user has navigated to a
		// hidden node in which case we still want to show them the usage.
		return [];
	}

	if (current.kind === CLI_COMMAND) {
		return [[path, current.description]];
	}

	if (current.kind === CLI_BRANCH) {
		const subcommandsForUsage: TwoColumnTableRow[] = [];
		for (const child of current.children) {
			subcommandsForUsage.push(
				...RecursiveUsageSubcommandRows(
					child,
					path ? `${path} ${child.name}` : child.name,
				),
			);
		}
		return subcommandsForUsage;
	}

	throw new Error('Unexpected kind');
}
