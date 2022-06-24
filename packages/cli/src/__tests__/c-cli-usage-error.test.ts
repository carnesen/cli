import { CCliUsageError } from '../c-cli-usage-error';

describe(CCliUsageError.name, () => {
	it('Constructs an error object with empty message by default', () => {
		const error = new CCliUsageError();
		expect(error).toBeInstanceOf(CCliUsageError);
		expect(error.message).toBe('');
	});

	it('Constructs an error object with property "code" set to "USAGE" with provided message', () => {
		const message = 'this is a message';
		const error = new CCliUsageError(message);
		expect(error).toBeInstanceOf(CCliUsageError);
		expect(error.message).toBe(message);
	});
});
