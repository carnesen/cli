import { CCliUsageError } from './c-cli-usage-error';

export function convertToBigint(rawValue: string): bigint {
	let value: bigint | undefined;
	if (rawValue.length > 0) {
		try {
			value = BigInt(rawValue);
		} catch (exception) {
			if (!(exception instanceof SyntaxError)) {
				throw exception;
			}
		}
	}
	if (typeof value === 'undefined') {
		throw new CCliUsageError(`"${rawValue}" is not an integer`);
	}

	return value;
}
