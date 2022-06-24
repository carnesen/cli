import { cCliColorFactory } from '../c-cli-color-factory';
import { CCliCommand } from '../c-cli-command';
import { CCliUsageError } from '../c-cli-usage-error';
import { CCliTerseError } from '../c-cli-terse-error';
import { getGlobalProcess } from '../c-cli-process';
import { CCli, CCliOptions } from '../c-cli';
import { CCliStringArgGroup } from '../arg-groups/c-cli-string-arg-group';

async function runMocked(action: () => any, options: CCliOptions = {}) {
	const mockOptions = {
		logger: { log: jest.fn(), error: jest.fn() },
		done: jest.fn(),
	};

	const command = CCliCommand.create({
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
			throw new CCliUsageError();
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch('Usage');
		expect(logMessage).toBe(undefined);
	});

	it('usage string includes "Error" and the message if provided', async () => {
		const { errorMessage } = await runMocked(() => {
			throw new CCliUsageError('Oops!');
		});
		expect(errorMessage).toMatch('Oops!');
		expect(errorMessage).toMatch('Error');
	});

	it("exits 1 and logger.error's a red error message if action throws a TerseError", async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw new CCliTerseError('foo');
		});
		expect(exitCode).toBe(1);
		expect(errorMessage).toMatch(cCliColorFactory().red('Error:'));
		expect(errorMessage).toMatch('foo');
		expect(logMessage).toBe(undefined);
	});

	it('does not use red in the error message if ansi is false', async () => {
		const { errorMessage } = await runMocked(
			() => {
				throw new CCliTerseError('foo');
			},
			{ ansi: false },
		);
		expect(errorMessage).not.toMatch(cCliColorFactory(true).red('Error:'));
		expect(errorMessage).toMatch('Error:');
	});

	it("exits 1 and logger.error's the full error if action throws a TerseError without a message", async () => {
		const { exitCode, errorMessage, logMessage } = await runMocked(() => {
			throw new CCliTerseError('');
		});
		expect(exitCode).toBe(1);
		expect(typeof errorMessage).toBe('object');
		expect(errorMessage).toBeInstanceOf(CCliTerseError);
		expect(logMessage).toBe(undefined);
	});

	it('exits with the specified code if exitCode is a number', async () => {
		const error = new CCliTerseError('', 123);
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
		const command = CCliCommand.create({
			name: 'cli',
			action() {
				// do nothing
			},
		});
		const exitCode = await CCli.create(command).run([]);
		expect(mockExit).toHaveBeenCalledWith(0);
		expect(exitCode).toBe(0);
	});

	it(`logger.error's an exception that is a usage error but tree=undefined`, async () => {
		const command = CCliCommand.create({
			name: 'cli',
			action() {
				return 'something';
			},
		});
		const spy = jest.fn();
		const codedError = new CCliUsageError('Ah!');
		const options: CCliOptions = {
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
		const command = CCliCommand.create({
			name: 'cli',
			action() {
				// nothing;
			},
		});
		const spy = jest.fn();
		const error = new Error('Ah!');
		const options: CCliOptions = {
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
		const command = CCliCommand.create({
			name: 'whatever',
			positionalArgGroup: CCliStringArgGroup.create(),
			action({ positionalValue }) {
				return positionalValue;
			},
		});
		const options: CCliOptions = {
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
