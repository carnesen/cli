import { CCliCommand } from '../c-cli-command';
import { CCliStringArgGroup } from '../arg-group-factories/c-cli-string-arg-group';
import { CCli, CCliOptions } from '../c-cli';

describe(CCli.prototype.runLine.name, () => {
	it('has a runLine method that parses the command-line', async () => {
		const command = CCliCommand.create({
			name: 'cli',
			positionalArgGroup: CCliStringArgGroup.create(),
			action({ positionalValue: str }) {
				expect(str).toBe('foo');
			},
		});
		const options: CCliOptions = { done: () => {} };
		const exitCode = await CCli.create(command, options).runLine('"foo"');
		expect(exitCode).toBe(0);
	});

	it("runLine consoleErrors if there's an unterminated quote", async () => {
		const spy = jest.fn();
		const command = CCliCommand.create({
			name: 'cli',
			action() {},
		});
		const options: CCliOptions = {
			done: () => {},
			logger: {
				error: spy,
				log: jest.fn(),
			},
		};
		const exitCode = await CCli.create(command, options).runLine('"foo');
		expect(exitCode).not.toBe(0);
		expect(spy).toHaveBeenCalledWith('Error: Unterminated "-quoted string');
	});

	it('runLine catches done if it throws', async () => {
		const spy = jest.fn();
		const command = CCliCommand.create({
			name: 'cli',
			action() {},
		});
		const error = new Error();
		const options: CCliOptions = {
			done: () => {
				throw error;
			},
			logger: {
				error: spy,
				log: jest.fn(),
			},
		};
		const exitCode = await CCli.create(command, options).runLine('"');
		expect(exitCode).toBe(1);
		expect(spy).toHaveBeenCalledWith('"done" callback threw');
		expect(spy).toHaveBeenCalledWith(error);
	});

	it('has reasonable default options', () => {
		const command = CCliCommand.create({
			name: 'cli',
			action() {},
		});
		CCli.create(command);
	});

	it('line defaults to empty string', () => {
		const command = CCliCommand.create({
			name: 'cli',
			action() {},
		});
		const options: CCliOptions = { done() {} };
		CCli.create(command, options).runLine();
	});
});
