import { runAndCatch } from '@carnesen/run-and-catch';
import { navigateToCommand } from './navigate-to-command';
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
	children: [command],
});

describe(navigateToCommand.name, () => {
	it('finds a command in a tree based on command-line arguments', () => {
		const [node, args] = navigateToCommand(branch, ['echo', 'foo']);
		expect(node.current).toBe(command);
		expect(node.parents[0]).toBe(branch);
		expect(args).toEqual(['foo']);
	});

	it('throws an error if passed an unexpected kind', async () => {
		const exception = await runAndCatch(
			navigateToCommand,
			{ current: {} } as any,
			[],
		);
		expect(exception.message).toMatch('Unexpected kind');
	});
});
