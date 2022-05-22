import { runAndCatchSync } from '@carnesen/run-and-catch';
import { convertToNumber } from '../util';
import { C_CLI_USAGE_ERROR } from '../c-cli-usage-error';

describe(convertToNumber.name, () => {
	it('converts the provided string to a number', () => {
		expect(convertToNumber('1')).toBe(1);
	});

	it('throws a usage error if a non-numeric string value is passed', () => {
		const ex = runAndCatchSync(convertToNumber, 'foo');
		expect(ex.code).toBe(C_CLI_USAGE_ERROR);
		expect(ex.message).toMatch('not a number');
	});

	it('throws a usage error if an empty string is passed', () => {
		const ex = runAndCatchSync(convertToNumber, '');
		expect(ex.code).toBe(C_CLI_USAGE_ERROR);
		expect(ex.message).toMatch('not a number');
	});
});
