import { CCliTerseError, C_CLI_TERSE_ERROR } from '../c-cli-terse-error';

describe(CCliTerseError.name, () => {
	it('Constructs an error object with property "code" set to "TERSE" with provided message', () => {
		const message = 'this is a message';
		const error = new CCliTerseError(message);
		expect(error.code).toBe(C_CLI_TERSE_ERROR);
		expect(error.message).toBe(message);
	});
});
