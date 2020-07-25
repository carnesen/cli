import { runAndCatch } from '@carnesen/run-and-catch';
import { UsageSubcommandRows } from '../usage-subcommand-rows';
import { CliBranch } from '../cli-branch';
import { CliCommand } from '../cli-command';

const command = CliCommand({
	name: 'list',
	action() {},
	description: 'La da dee',
});

const hiddenCommand = CliCommand({
	name: 'foo',
	hidden: true,
	action() {},
});

const branch = CliBranch({
	name: 'users',
	subcommands: [command, hiddenCommand],
});
const root = CliBranch({ name: 'cloud', subcommands: [branch] });

describe(UsageSubcommandRows.name, () => {
	it('lists all commands underneath the provided branch, recursive', () => {
		const rows = UsageSubcommandRows(root);
		// This also verifies that hidden commands do not show up
		expect(rows.length).toBe(1);
		const [name, description] = rows[0];
		expect(name).toBe('users list');
		expect(description).toBe(command.description);
	});
	it('throws "Unexpected kind" on bad object', async () => {
		const exception = await runAndCatch(UsageSubcommandRows, {} as any);
		expect(exception.message).toBe('Unexpected kind');
	});
});
