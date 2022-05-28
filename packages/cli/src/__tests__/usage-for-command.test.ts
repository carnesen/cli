import { CCliCommand } from '../c-cli-command';
import { usageForCommand } from '../usage-for-command';
import { cCliColorFactory } from '../c-cli-color-factory';
import { CCliStringArgGroup } from '../arg-group-factories/c-cli-string-arg-group';

const argGroup = CCliStringArgGroup.create({
	required: true,
	placeholder: '<p>',
});

const command = CCliCommand.create({
	name: 'list',
	positionalArgGroup: argGroup,
	namedArgGroups: {
		foo: argGroup,
	},
	doubleDashArgGroup: argGroup,
	action() {},
	description: 'La da dee',
});

describe(usageForCommand.name, () => {
	it('Generates a usage string for a command', () => {
		const indentation = '   ';
		const lines = usageForCommand(
			{ current: command as any, parents: [] },
			{ columns: 100, indentation, color: cCliColorFactory() },
		);
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
