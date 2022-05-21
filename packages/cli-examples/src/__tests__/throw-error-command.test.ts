import { runAndCatch } from '@carnesen/run-and-catch';

import { CliUsageError, CliTerseError, Cli } from '@carnesen/cli';
import { throwErrorCommand } from '../throw-error-command';

const cli = Cli(throwErrorCommand);

describe(throwErrorCommand.name, () => {
	it('throws a regular Error by default', async () => {
		const exception = await runAndCatch(() => cli.api(['--message', 'foo']));
		expect(exception instanceof Error).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it('throws a regular Error if --kind normal is passed', async () => {
		const exception = await runAndCatch(() =>
			cli.api(['--message', 'foo', '--kind', 'normal']),
		);
		expect(exception instanceof Error).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it(`throws a ${CliUsageError.name} if "--kind usage" is provided`, async () => {
		const exception = await runAndCatch(() =>
			cli.api(['--message', 'foo', '--kind', 'usage']),
		);
		expect(exception instanceof CliUsageError).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it(`throws a ${CliTerseError.name} if "--kind usage" is provided`, async () => {
		const exception = await runAndCatch(() =>
			cli.api(['--message', 'foo', '--kind', 'terse']),
		);
		expect(exception instanceof CliTerseError).toBe(true);
		expect(exception.message).toBe('foo');
	});
});
