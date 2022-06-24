import { CCliTree } from './c-cli-tree';
import { usageForCommandGroup } from './usage-for-command-group';
import { usageForCommand } from './usage-for-command';
import { UsageOptions } from './usage-options';
import { CCliCommandGroup } from './c-cli-command-group';
import { CCliCommand } from './c-cli-command';

export function usageFactory(tree: CCliTree, options: UsageOptions): string {
	const { current, parents } = tree;

	let lines: string[] = [];
	if (current instanceof CCliCommandGroup) {
		lines = usageForCommandGroup({ current, parents }, options);
	} else if (current instanceof CCliCommand) {
		lines = usageForCommand({ current, parents }, options);
	} else {
		throw new Error('Unexpected kind');
	}
	return lines.join('\n');
}
