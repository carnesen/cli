import { CliCommand } from '../cli-command';
import { UsageForCommand } from '../usage-for-command';
import { CliAnsi } from '../cli-ansi';
import { CliStringArgGroup } from '../arg-group-factories/cli-string-arg-group';

const argGroup = CliStringArgGroup({
	required: true,
	placeholder: '<p>',
});

const command = CliCommand({
	name: 'list',
	positionalArgGroup: argGroup,
	namedArgGroups: {
		foo: argGroup,
	},
	doubleDashArgGroup: argGroup,
	action() {},
	description: 'La da dee',
});

describe(UsageForCommand.name, () => {
	it('Generates a usage string for a command', () => {
		const indentation = '   ';
		const lines = UsageForCommand(
			{ current: command as any, parents: [] },
			{ columns: 100, indentation, ansi: CliAnsi() },
		);
		console.log(lines);
		expect(lines.length).toBe(15);
		expect(lines[0]).toMatch(`-- ${argGroup.placeholder}`);
		expect(lines[1]).toBe('');
		expect(lines[2]).toBe(`${indentation}${command.description}`);
		expect(lines[3]).toBe('');
		expect(lines[4]).toBe('Positional arguments:');
		expect(lines[5]).toBe('');
		expect(lines[6]).toBe(`${indentation}${argGroup.placeholder}`);
		expect(lines[7]).toBe('');
		expect(lines[8]).toBe('Named arguments:');
		expect(lines[9]).toBe('');
		expect(lines[10]).toBe(`${indentation}--foo ${argGroup.placeholder}`);
		expect(lines[11]).toBe('');
		expect(lines[12]).toBe('"Double dash" arguments:');
		expect(lines[13]).toBe('');
		expect(lines[14]).toBe(`${indentation}${argGroup.placeholder}`);
	});
});
