import { CliCommand } from '../cli-command';
import { CliStringArgGroup } from '../arg-group-factories/cli-string-arg-group';
import { CliRunLine } from '../cli-run-line';
import { CliApi } from '../cli-api';
import { CliRun } from '../cli-run';
import { ICliOptions } from '../cli-options';

describe(CliRunLine.name, () => {
	it('has a runLine method that parses the command-line', async () => {
		const command = CliCommand({
			name: 'cli',
			positionalArgGroup: CliStringArgGroup(),
			action({ positionalValue: str }) {
				expect(str).toBe('foo');
			},
		});
		const options: ICliOptions = { done: () => {} };
		const api = CliApi(command, options);
		const run = CliRun(api, options);
		const exitCode = await CliRunLine(run, options)('"foo"');
		expect(exitCode).toBe(0);
	});

	it("runLine consoleErrors if there's an unterminated quote", async () => {
		const spy = jest.fn();
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		const options: ICliOptions = {
			done: () => {},
			console: {
				error: spy,
				log: jest.fn(),
			},
		};
		const api = CliApi(command, options);
		const run = CliRun(api, options);
		const exitCode = await CliRunLine(run, options)('"foo');
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
		const options: ICliOptions = {
			done: () => {
				throw error;
			},
			console: {
				error: spy,
				log: jest.fn(),
			},
		};
		const api = CliApi(command, options);
		const run = CliRun(api, options);
		const exitCode = await CliRunLine(run, options)('"');
		expect(exitCode).toBe(1);
		expect(spy).toHaveBeenCalledWith('"done" callback threw');
		expect(spy).toHaveBeenCalledWith(error);
	});

	it('has reasonable default options', () => {
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		const api = CliApi(command);
		const run = CliRun(api);
		CliRunLine(run);
	});

	it('line defaults to empty string', () => {
		const command = CliCommand({
			name: 'cli',
			action() {},
		});
		const options: ICliOptions = { done() {} };
		const api = CliApi(command, options);
		const run = CliRun(api, options);
		CliRunLine(run, options)();
	});
});
