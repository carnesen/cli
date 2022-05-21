import { runAndCatch } from '@carnesen/run-and-catch';
import { navigateCliTree } from '../navigate-cli-tree';
import { cliCommandGroupFactory } from '../cli-command-group';
import { CliCommand } from '../cli-command';

const command = CliCommand({
	name: 'echo',
	action(foo) {
		return foo;
	},
});

const commandGroup = cliCommandGroupFactory({
	name: 'cli',
	subcommands: [command],
});

describe(navigateCliTree.name, () => {
	it('finds a command in a tree based on command-line arguments', () => {
		const {
			tree: { current, parents },
			args,
		} = navigateCliTree(commandGroup, ['echo', 'foo']);
		expect(current).toBe(command);
		expect(parents[0]).toBe(commandGroup);
		expect(args).toEqual(['foo']);
	});

	it('throws an error if passed an unexpected kind', async () => {
		const exception = await runAndCatch(
			navigateCliTree,
			{ current: {} } as any,
			[],
		);
		expect(exception.message).toMatch('Unexpected kind');
	});
});
