import { runAndCatch } from '@carnesen/run-and-catch';

import { CCliUsageError, CCliTerseError, c } from '@carnesen/cli';
import { throwErrorCommand } from '../throw-error-command';

const cli = c.cli(throwErrorCommand);

describe(throwErrorCommand.name, () => {
	it('throws a regular Error by default', async () => {
		const exception = await runAndCatch(() => cli.api(['--message', 'foo']));
		expect(exception instanceof Error).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it('throws a regular Error if --kind normal is passed', async () => {
		const exception = await runAndCatch(() => cli.api(['--message', 'foo']));
		expect(exception instanceof Error).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it(`throws a ${CCliUsageError.name} if "--kind usage" is provided`, async () => {
		const exception = await runAndCatch(() =>
			cli.api(['--message', 'foo', '--kind', 'usage']),
		);
		expect(exception instanceof CCliUsageError).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it(`throws a ${CCliTerseError.name} if "--kind usage" is provided`, async () => {
		const exception = await runAndCatch(() =>
			cli.api(['--message', 'foo', '--kind', 'terse']),
		);
		expect(exception instanceof CCliTerseError).toBe(true);
		expect(exception.message).toBe('foo');
	});
});
