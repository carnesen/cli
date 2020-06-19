import { CliCommand } from './cli-command';
import { UsageForCommand } from './usage-for-command';

const command = CliCommand({
	name: 'list',
	action() {},
	description: 'La da dee',
});

describe(UsageForCommand.name, () => {
	it('', () => {
		const indentation = '---';
		const lines = UsageForCommand(command, [], 100, indentation);
		expect(lines.length).toBe(4);
		expect(lines[2]).toBe(`${indentation}${command.description}`);
		expect(lines.slice(-1)[0]).toBe('');
	});
});
