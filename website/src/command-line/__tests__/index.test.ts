import { CommandLine } from '..';

const commandLine = new CommandLine();
describe(`${CommandLine.name}`, () => {
	it(`${commandLine.next.name} and ${commandLine.previous.name} methods work as intended`, () => {
		commandLine.setValue('foo');
		commandLine.previous();
		commandLine.previous();
		commandLine.previous();
		commandLine.previous();
		commandLine.next();
		commandLine.insert('x');
		commandLine.next();
		commandLine.insert('y');
		commandLine.next();
		commandLine.next();
		commandLine.next();
		expect(commandLine.value()).toBe('fxoyo');
	});

	it(`${commandLine.reset.name} resets the line and index`, () => {
		commandLine.setValue('foo');
		commandLine.reset();
		expect(commandLine.value()).toBe('');
	});
});
