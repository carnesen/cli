import { runAndCatch } from '@carnesen/run-and-catch';
import { findCliTree } from './find-cli-tree';
import { CliBranch } from './cli-branch';
import { CliCommand } from './cli-command';

const command = CliCommand({
	name: 'echo',
	action(foo) {
		return foo;
	},
});

const branch = CliBranch({
	name: 'cli',
	subcommands: [command],
});

describe(findCliTree.name, () => {
	it('finds a command in a tree based on command-line arguments', () => {
		const { current, parents, args } = findCliTree(branch, ['echo', 'foo']);
		expect(current).toBe(command);
		expect(parents[0]).toBe(branch);
		expect(args).toEqual(['foo']);
	});

	it('throws an error if passed an unexpected kind', async () => {
		const exception = await runAndCatch(
			findCliTree,
			{ current: {} } as any,
			[],
		);
		expect(exception.message).toMatch('Unexpected kind');
	});
});
