import { CodedError } from '@carnesen/coded-error';
import { cliColorFactory } from '../cli-color-factory';
import { CliCommand } from '../cli-command';
import { CliUsageError, CLI_USAGE_ERROR } from '../cli-usage-error';
import { CliTerseError, CLI_TERSE_ERROR } from '../cli-terse-error';
import { CliOptions } from '../cli-options';
import { getGlobalProcess } from '../cli-process';
import { CCli } from '../c-cli';
import { CliStringArgGroup } from '../arg-group-factories/cli-string-arg-group';

async function runMocked(action: () => any, options: CliOptions = {}) {
	const mockOptions = {
		logger: { log: jest.fn(), error: jest.fn() },
		done: jest.fn(),
	};

	const command = CliCommand({
		name: 'cli',
		action,
	});

	const cli = CCli.create(command, { ...mockOptions, ...options });

	await cli.run([]);

	expect(mockOptions.done.mock.calls.length).toBe(1);
	expect(mockOptions.done.mock.calls[0].length).toBe(1);
	const exitCode = mockOptions.done.mock.calls[0][0];

	expect(
		mockOptions.logger.error.mock.calls.length +
			mockOptions.logger.log.mock.calls.length,
	).toBeLessThanOrEqual(1);
	let errorMessage: any;
	let logMessage: any;
	if (mockOptions.logger.log.mock.calls.length === 1) {
		expect(mockOptions.logger.log.mock.calls.length).toBe(1);
		[[logMessage]] = mockOptions.logger.log.mock.calls;
	}
	if (mockOptions.logger.error.mock.calls.length === 1) {
		expect(mockOptions.logger.error.mock.calls.length).toBe(1);
		[[errorMessage]] = mockOptions.logger.error.mock.calls;
	}
	return { exitCode, errorMessage, logMessage };
}

describe(CCli.prototype.run.name, () => {
	it('exits 0 and does not logger.log if action succeeds', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			// do nothing
		});
		expect(exitCode).toBe(0);
		expect(errorMessage).toBe(undefined);
		expect(logMessage).toBe(undefined);
	});

	it("exits 0 and logger.log's resolved value if action succeeds", async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => 'foo');
		expect(exitCode).toBe(0);
		expect(errorMessage).toBe(undefined);
		expect(logMessage).toBe('foo');
	});

	it('exits 1 and logger.error\'s "non-truthy exception" if action throws a non-truthy exception', async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			// eslint-disable-next-line no-throw-literal
			throw '';
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch('non-truthy exception');
		expect(logMessage).toBe(undefined);
	});

	it("exits 1 and logger.error's a usage string if action throws a UsageError", async () => {
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

	it("exits 1 and logger.error's a red error message if action throws a TerseError", async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw new CliTerseError('foo');
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch(cliColorFactory().red('Error:'));
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
		expect(errorMessage).not.toMatch(cliColorFactory(true).red('Error:'));
		expect(errorMessage).toMatch('Error:');
	});

	it("exits 1 and logger.error's the full error if action throws a TerseError without a message", async () => {
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

	it("logger.error's any other error thrown and exits 1", async () => {
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
		const exitCode = await CCli.create(command).run([]);
		expect(mockExit).toHaveBeenCalledWith(0);
		expect(exitCode).toBe(0);
	});

	it(`logger.error's an exception that has code=${CLI_USAGE_ERROR} but tree=undefined`, async () => {
		const command = CliCommand({
			name: 'cli',
			action() {
				return 'something';
			},
		});
		const spy = jest.fn();
		const codedError = new CodedError('Ah!', CLI_USAGE_ERROR);
		const options: CliOptions = {
			done: () => {},
			logger: {
				log() {
					throw codedError;
				},
				error: spy,
			},
		};
		const exitCode = await CCli.create(command, options).run([]);
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
		const options: CliOptions = {
			done: () => {
				throw error;
			},
			logger: {
				log() {
					// nothing
				},
				error: spy,
			},
		};
		const exitCode = await CCli.create(command, options).run([]);
		expect(exitCode).toBe(0);
		expect(spy).toHaveBeenCalledWith(error);
	});

	it(`sets args to process.argv.slice(2) by default`, async () => {
		const spy = jest.fn();
		const command = CliCommand({
			name: 'whatever',
			positionalArgGroup: CliStringArgGroup(),
			action({ positionalValue }) {
				return positionalValue;
			},
		});
		const options: CliOptions = {
			done: () => {
				// nothing
			},
			logger: {
				log: spy,
				error: () => {},
			},
		};
		const cli = CCli.create(command, options);
		const globalProcess = getGlobalProcess();
		const originalArgv = globalProcess.argv;
		globalProcess.argv = ['ignored', 'also ignored', 'foo bar baz'];
		const exitCode = await cli.run();
		expect(exitCode).toBe(0);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
		globalProcess.argv = originalArgv;
	});
});
