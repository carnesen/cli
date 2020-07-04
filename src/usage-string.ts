import { ICliTree } from './cli-tree';
import { CLI_BRANCH } from './cli-branch';
import { UsageForBranch } from './usage-for-branch';
import { CLI_COMMAND } from './cli-command';
import { UsageForCommand } from './usage-for-command';

export function UsageString(
	tree: ICliTree,
	maxLineLength = +Infinity,
	indentation = '',
): string {
	const { current, parents } = tree;
	let lines: string[] = [];
	if (current.kind === CLI_BRANCH) {
		lines = UsageForBranch(current, parents, maxLineLength, indentation);
	} else if (current.kind === CLI_COMMAND) {
		lines = UsageForCommand(current, parents, maxLineLength, indentation);
	} else {
		throw new Error('Unexpected kind');
	}
	return lines.join('\n');
}
