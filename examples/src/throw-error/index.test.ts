import { runAndCatch } from '@carnesen/run-and-catch';

import { CliUsageError, CliTerseError } from '@carnesen/cli';
import { cli, throwError } from '.';

describe(throwError.name, () => {
	it('throws a regular Error by default', async () => {
		const exception = await runAndCatch(cli, '--message', 'foo');
		expect(exception instanceof Error).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it(`throws a ${CliUsageError.name} if "--class usage" is provided`, async () => {
		const exception = await runAndCatch(
			cli,
			'--message',
			'foo',
			'--class',
			'usage',
		);
		expect(exception instanceof CliUsageError).toBe(true);
		expect(exception.message).toBe('foo');
	});

	it(`throws a ${CliTerseError.name} if "--class usage" is provided`, async () => {
		const exception = await runAndCatch(
			cli,
			'--message',
			'foo',
			'--class',
			'terse',
		);
		expect(exception instanceof CliTerseError).toBe(true);
		expect(exception.message).toBe('foo');
	});
});
