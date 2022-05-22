import { CCliUsageError, C_CLI_USAGE_ERROR } from '../c-cli-usage-error';

describe(CCliUsageError.name, () => {
	it('Constructs an error object with property "code" set to "USAGE"', () => {
		const error = new CCliUsageError();
		expect(error.code).toBe(C_CLI_USAGE_ERROR);
		expect(error.message).toBe('');
	});

	it('Constructs an error object with property "code" set to "USAGE" with provided message', () => {
		const message = 'this is a message';
		const error = new CCliUsageError(message);
		expect(error.code).toBe(C_CLI_USAGE_ERROR);
		expect(error.message).toBe(message);
	});
});
