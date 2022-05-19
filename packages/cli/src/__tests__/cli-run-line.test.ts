import { CliCommand } from '../cli-command';
import { CliStringArgGroup } from '../arg-group-factories/cli-string-arg-group';
import { CliOptions } from '../cli-options';
import { Cli } from '../cli';

describe(Cli.prototype.runLine.name, () => {
	it('has a runLine method that parses the command-line', async () => {
		const command = CliCommand({
			name: 'cli',
			positionalArgGroup: CliStringArgGroup(),
			action({ positionalValue: str }) {
				expect(str).toBe('foo');
			},
		});
		const options: CliOptions = { done: () => {} };
		const exitCode = await Cli.create(command, options).runLine('"foo"');
		expect(exitCode).toBe(0);
	});

	it("runLine consoleErrors if there's an unterminated quote", async () => {
		const spy = jest.fn();
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		const options: CliOptions = {
			done: () => {},
			logger: {
				error: spy,
				log: jest.fn(),
			},
		};
		const exitCode = await Cli.create(command, options).runLine('"foo');
		expect(exitCode).not.toBe(0);
		expect(spy).toHaveBeenCalledWith('Error: Unterminated "-quoted string');
	});

	it('runLine catches done if it throws', async () => {
		const spy = jest.fn();
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		const error = new Error();
		const options: CliOptions = {
			done: () => {
				throw error;
			},
			logger: {
				error: spy,
				log: jest.fn(),
			},
		};
		const exitCode = await Cli.create(command, options).runLine('"');
		expect(exitCode).toBe(1);
		expect(spy).toHaveBeenCalledWith('"done" callback threw');
		expect(spy).toHaveBeenCalledWith(error);
	});

	it('has reasonable default options', () => {
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		Cli.create(command);
	});

	it('line defaults to empty string', () => {
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		const options: CliOptions = { done() {} };
		Cli.create(command, options).runLine();
	});
});
