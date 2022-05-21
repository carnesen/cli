import { runAndCatch } from '@carnesen/run-and-catch';
import { usageSubcommandRowsFactory } from '../usage-subcommand-rows';
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
const color = cliColorFactory();
const input: CliDescriptionFunctionInput = { ansi: color, color };

describe(usageSubcommandRowsFactory.name, () => {
	it('lists all commands underneath the provided command group, recursive', () => {
		const rows = usageSubcommandRowsFactory(root, input);
		// This also verifies that hidden commands do not show up
		expect(rows.length).toBe(1);
		const [name, description] = rows[0];
		expect(name).toBe('users list');
		expect(description).toBe(command.description);
	});
	it('throws "Unexpected kind" on bad object', async () => {
		const exception = await runAndCatch(
			usageSubcommandRowsFactory,
			{} as any,
			input,
		);
		expect(exception.message).toBe('Unexpected kind');
	});
});
