import { CodedError } from '@carnesen/coded-error';
import {
	CliCommand,
	CliOneOfValuedParser,
	CliStringValuedParser,
	runCliAndExit,
} from '@carnesen/cli';

export const throwSpecialError = CliCommand({
	name: 'throw-special-error',
	description: 'Throw a special error in this command\'s "action" function',
	namedParsers: {
		message: CliStringValuedParser({
			description: 'A message',
			required: true,
		}),
		code: CliOneOfValuedParser({
			values: ['usage' as const, 'terse' as const],
			required: false,
			description: `Throw a UsageError, TerseError, or regular Error`,
		}),
	},
	action(_, { message, code }) {
		throw new CodedError(message, code);
	},
});

if (module === require.main) {
	runCliAndExit(throwSpecialError);
}
