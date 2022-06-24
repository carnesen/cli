import { runAndCatchSync } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../c-cli-usage-error';
import { convertToNumber } from '../util';

describe(convertToNumber.name, () => {
	it('converts the provided string to a number', () => {
		expect(convertToNumber('1')).toBe(1);
	});

	it('throws a usage error if a non-numeric string value is passed', () => {
		const exception = runAndCatchSync(convertToNumber, 'foo');
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch('not a number');
	});

	it('throws a usage error if an empty string is passed', () => {
		const exception = runAndCatchSync(convertToNumber, '');
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch('not a number');
	});
});
