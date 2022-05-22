import { runAndCatch } from '@carnesen/run-and-catch';
import { navigateCliTree } from '../navigate-cli-tree';
import { CCliCommand } from '../c-cli-command';
import { CCliCommandGroup } from '../c-cli-command-group';

const command = CCliCommand.create({
	name: 'echo',
	action(foo) {
		return foo;
	},
});

const commandGroup = CCliCommandGroup.create({
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
