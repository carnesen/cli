import { CodedError } from '@carnesen/coded-error';
import { CliAnsi } from '../cli-ansi';
import { CliApi } from '../cli-api';
import { CliCommand } from '../cli-command';
import { CliConsole } from '../cli-console';
import { CliUsageError, CLI_USAGE_ERROR } from '../cli-usage-error';
import { CliTerseError, CLI_TERSE_ERROR } from '../cli-terse-error';
import { ICliOptions } from '../cli-options';
import { CliRun } from '../cli-run';

async function runMocked(action: () => any, options: ICliOptions = {}) {
	const mockOptions = {
		console: { log: jest.fn(), error: jest.fn() },
		done: jest.fn(),
	};

	const command = CliCommand({
		name: 'cli',
		action,
	});

	const api = CliApi(command, { ...mockOptions, ...options });

	const cliRun = CliRun(api, { ...mockOptions, ...options });

	await cliRun([]);

	expect(mockOptions.done.mock.calls.length).toBe(1);
	expect(mockOptions.done.mock.calls[0].length).toBe(1);
	const exitCode = mockOptions.done.mock.calls[0][0];

	expect(
		mockOptions.console.error.mock.calls.length +
			mockOptions.console.log.mock.calls.length,
	).toBeLessThanOrEqual(1);
	let errorMessage: any;
	let logMessage: any;
	if (mockOptions.console.log.mock.calls.length === 1) {
		expect(mockOptions.console.log.mock.calls.length).toBe(1);
		[[logMessage]] = mockOptions.console.log.mock.calls;
	}
	if (mockOptions.console.error.mock.calls.length === 1) {
		expect(mockOptions.console.error.mock.calls.length).toBe(1);
		[[errorMessage]] = mockOptions.console.error.mock.calls;
	}
	return { exitCode, errorMessage, logMessage };
}

describe(CliRun.name, () => {
	it('exits 0 and does not console.log if action succeeds', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			// do nothing
		});
		expect(exitCode).toBe(0);
		expect(errorMessage).toBe(undefined);
		expect(logMessage).toBe(undefined);
	});

	it('exits 0 and console.logs resolved value if action succeeds', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => 'foo');
		expect(exitCode).toBe(0);
		expect(errorMessage).toBe(undefined);
		expect(logMessage).toBe('foo');
	});

	it('exits 1 and console.errors "non-truthy exception" if action throws a non-truthy exception', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			// eslint-disable-next-line no-throw-literal
			throw '';
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch('non-truthy exception');
		expect(logMessage).toBe(undefined);
	});

	it('exits 1 and console.errors a usage string if action throws a UsageError', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw new CliUsageError();
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch('Usage');
		expect(logMessage).toBe(undefined);
	});

	it('usage string includes "Error" and the message if provided', async () => {
		const { errorMessage } = await runMocked(() => {
			throw new CliUsageError('Oops!');
		});
		expect(errorMessage).toMatch('Oops!');
		expect(errorMessage).toMatch('Error');
	});

	it('exits 1 and console.errors a red error message if action throws a TerseError', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw new CliTerseError('foo');
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch(CliAnsi().red('Error:'));
		expect(errorMessage).toMatch('foo');
		expect(logMessage).toBe(undefined);
	});

	it('does not use red in the error message if ansi is false', async () => {
		const { errorMessage } = await runMocked(
			() => {
				throw new CliTerseError('foo');
			},
			{ ansi: false },
		);
		expect(errorMessage).not.toMatch(CliAnsi(true).red('Error:'));
		expect(errorMessage).toMatch('Error:');
	});

	it('exits 1 and console.errors the full error if action throws a TerseError without a message', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw new CliTerseError('');
		});
		expect(exitCode).toBe(1);
		expect(typeof errorMessage).toBe('object');
		expect(errorMessage.code).toBe(CLI_TERSE_ERROR);
		expect(logMessage).toBe(undefined);
	});

	it('exits with the specified code if exitCode is a number', async () => {
		const error = new CliTerseError('', 123);
		const { exitCode } = await runMocked(() => {
			throw error;
		});
		expect(exitCode).toBe(123);
	});

	it('console.errors any other error thrown and exits 1', async () => {
		const error = new Error();
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw error;
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toBe(error);
		expect(logMessage).toBe(undefined);
	});

	it('calls the system process.exit at the end by default', async () => {
		const mockExit = jest
			.spyOn((globalThis as any).process, 'exit')
			.mockImplementation((() => {}) as any);
		const command = CliCommand({
			name: 'cli',
			action() {
				// do nothing
			},
		});
		const exitCode = await CliRun(CliApi(command))([]);
		expect(mockExit).toHaveBeenCalledWith(0);
		expect(exitCode).toBe(0);
	});

	it(`console.errors an exception that has code=${CLI_USAGE_ERROR} but tree=undefined`, async () => {
		const command = CliCommand({
			name: 'cli',
			action() {
				return 'something';
			},
		});
		const spy = jest.fn();
		const codedError = new CodedError('Ah!', CLI_USAGE_ERROR);
		const options: ICliOptions = {
			done: () => {},
			console: {
				log() {
					throw codedError;
				},
				error: spy,
			},
		};
		const cliRun = CliRun(CliApi(command, options), options);
		const exitCode = await cliRun([]);
		expect(exitCode).not.toBe(0);
		expect(spy).toHaveBeenCalledWith(codedError);
	});

	it(`handles it gracefully if the "done" callback throws`, async () => {
		const command = CliCommand({
			name: 'cli',
			action() {
				// nothing;
			},
		});
		const spy = jest.fn();
		const error = new Error('Ah!');
		const options: ICliOptions = {
			done: () => {
				throw error;
			},
			console: {
				log() {
					// nothing
				},
				error: spy,
			},
		};
		const cliRun = CliRun(CliApi(command, options), options);
		const exitCode = await cliRun([]);
		expect(exitCode).toBe(0);
		expect(spy).toHaveBeenCalledWith(error);
	});

	it(`sets args to process.argv.slice(2) by default`, async () => {
		const spy = jest.fn();
		const options: ICliOptions = {
			done: () => {
				// nothing
			},
			console: {
				log: spy,
				error: CliConsole().error,
			},
		};
		const cliRun = CliRun((args) => Promise.resolve(args), options);
		const exitCode = await cliRun();
		expect(exitCode).toBe(0);
		expect(spy).toHaveBeenCalledWith(process.argv.slice(2));
	});
});
