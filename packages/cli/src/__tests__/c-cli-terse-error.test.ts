import { CCliTerseError } from '../c-cli-terse-error';

describe(CCliTerseError.name, () => {
	it('Constructs an error object with property "code" set to "TERSE" with provided message', () => {
		const message = 'this is a message';
		const error = new CCliTerseError(message);
		expect(error).toBeInstanceOf(CCliTerseError);
		expect(error.message).toBe(message);
	});
});
