import { UsageSubcommandRows } from './usage-subcommand-rows';
import { CliBranch } from './cli-branch';
import { CliCommand } from './cli-command';

const list = CliCommand({
	name: 'list',
	action() {},
	description: 'La da dee',
});
const users = CliBranch({ name: 'users', children: [list] });
const cloud = CliBranch({ name: 'cloud', children: [users] });

describe(UsageSubcommandRows.name, () => {
	it('', () => {
		const rows = UsageSubcommandRows(cloud);
		expect(rows.length).toBe(1);
		const [name, description] = rows[0];
		expect(name).toBe('users list');
		expect(description).toBe(list.description);
	});
});
