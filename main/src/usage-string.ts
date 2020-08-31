import { ICliTree } from './cli-tree';
import { CLI_COMMAND_GROUP } from './cli-command-group';
import { UsageForCommandGroup } from './usage-for-command-group';
import { CLI_COMMAND } from './cli-command';
import { UsageForCommand } from './usage-for-command';
import { IUsageOptions } from './usage-options';

export function UsageString(tree: ICliTree, options: IUsageOptions): string {
	const { current, parents } = tree;

	let lines: string[] = [];
	if (current.kind === CLI_COMMAND_GROUP) {
		lines = UsageForCommandGroup({ current, parents }, options);
	} else if (current.kind === CLI_COMMAND) {
		lines = UsageForCommand({ current, parents }, options);
	} else {
		throw new Error('Unexpected kind');
	}
	return lines.join('\n');
}
