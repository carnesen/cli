import { runAndCatch } from '@carnesen/run-and-catch';
import { usageSubcommandRowsFactory } from '../usage-subcommand-rows';
import { CCliCommand } from '../c-cli-command';
import { cCliColorFactory } from '../c-cli-color-factory';
import { CCliDescriptionFunctionInput } from '../c-cli-description';
import { CCliCommandGroup } from '../c-cli-command-group';

const command = CCliCommand.create({
	name: 'list',
	action() {},
	description: 'La da dee',
});

const hiddenCommand = CCliCommand.create({
	name: 'foo',
	hidden: true,
	action() {},
});

const commandGroup = CCliCommandGroup.create({
	name: 'users',
	subcommands: [command, hiddenCommand],
});
const root = CCliCommandGroup.create({
	name: 'cloud',
	subcommands: [commandGroup],
});
const color = cCliColorFactory();
const input: CCliDescriptionFunctionInput = { ansi: color, color };

describe(usageSubcommandRowsFactory.name, () => {
	it('lists all commands underneath the provided command group, recursive', () => {
		const rows = usageSubcommandRowsFactory(root, input);
		// This also verifies that hidden commands do not show up
		expect(rows.length).toBe(1);
		const [name, description] = rows[0];
		expect(name).toBe('users list');
		expect(description).toBe(command.options.description);
	});
	it('throws "Unexpected kind" on bad object', async () => {
		const exception = await runAndCatch(() =>
			usageSubcommandRowsFactory({ options: {} } as any, input),
		);
		expect(exception.message).toMatch('Expected instance');
	});
});
