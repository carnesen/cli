import { CliTree } from './cli-tree';
import { CLI_COMMAND_GROUP } from './cli-command-group';
import { usageForCommandGroup } from './usage-for-command-group';
import { CLI_COMMAND } from './cli-command';
import { usageForCommand } from './usage-for-command';
import { UsageOptions } from './usage-options';

export function usageFactory(tree: CliTree, options: UsageOptions): string {
	const { current, parents } = tree;

	let lines: string[] = [];
	if (current.kind === CLI_COMMAND_GROUP) {
		lines = usageForCommandGroup({ current, parents }, options);
	} else if (current.kind === CLI_COMMAND) {
		lines = usageForCommand({ current, parents }, options);
	} else {
		throw new Error('Unexpected kind');
	}
	return lines.join('\n');
}
