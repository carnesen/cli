import {
	CliCommand,
	CliStringChoiceArgGroup,
	CliStringArgGroup,
	CliUsageError,
	CliTerseError,
	CliNumberArgGroup,
} from '@carnesen/cli';

/**
 * A CliCommand for demonstrating how errors are displayed
 * */
export const throwErrorCommand = CliCommand({
	name: 'throw-error',
	description: "Throw an error to see how they're displayed",
	namedArgGroups: {
		message: CliStringArgGroup({
			description: 'A message',
			required: true,
		}),
		kind: CliStringChoiceArgGroup({
			choices: ['normal' as const, 'terse' as const, 'usage' as const],
			required: false,
			description: `
			Throw a normal Error (default), a UsageError, or a TerseError
			
			By default, if your command throws an Error, cli.run console.log's it
			including the stack trace.
			
			If instead your command (or custom argument parser) throws a UsageError, 
			cli.run prints your command's auto-generated usage documentation.

			TerseError tells cli.run to simply print the "message", no
			usage or stack trace.
			`,
		}),
		exitCode: CliNumberArgGroup({
			description: 'Numeric status code to exit with',
		}),
	},
	action({ namedValues: { message, kind, exitCode } }) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let error: any;
		switch (kind) {
			case 'usage': {
				error = new CliUsageError(message);
				break;
			}
			case 'terse': {
				error = new CliTerseError(message);
				break;
			}
			case 'normal':
			default: {
				error = new Error(message);
			}
		}
		if (typeof exitCode !== 'undefined') {
			error.exitCode = exitCode;
		}
		throw error;
	},
});
