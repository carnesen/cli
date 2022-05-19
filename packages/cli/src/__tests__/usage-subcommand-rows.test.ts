import { runAndCatch } from '@carnesen/run-and-catch';
import { UsageSubcommandRows } from '../usage-subcommand-rows';
import { cliCommandGroupFactory } from '../cli-command-group';
import { CliCommand } from '../cli-command';
import { cliColorFactory } from '../cli-color-factory';
import { CliDescriptionFunctionInput } from '../cli-description';

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

const commandGroup = cliCommandGroupFactory({
	name: 'users',
	subcommands: [command, hiddenCommand],
});
const root = cliCommandGroupFactory({
	name: 'cloud',
	subcommands: [commandGroup],
});
const options: CliDescriptionFunctionInput = { ansi: cliColorFactory() };

describe(UsageSubcommandRows.name, () => {
	it('lists all commands underneath the provided command group, recursive', () => {
		const rows = UsageSubcommandRows(root, options);
		// This also verifies that hidden commands do not show up
		expect(rows.length).toBe(1);
		const [name, description] = rows[0];
		expect(name).toBe('users list');
		expect(description).toBe(command.description);
	});
	it('throws "Unexpected kind" on bad object', async () => {
		const exception = await runAndCatch(
			UsageSubcommandRows,
			{} as any,
			options,
		);
		expect(exception.message).toBe('Unexpected kind');
	});
});
