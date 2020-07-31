import {
	CliCommand,
	CliStringChoiceArgGroup,
	CliStringArgGroup,
	CliUsageError,
	CliTerseError,
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
	},
	action({ namedValues: { message, kind } }) {
		switch (kind) {
			case 'usage': {
				throw new CliUsageError(message);
			}
			case 'terse': {
				throw new CliTerseError(message);
			}
			case 'normal':
			default: {
				throw new Error(message);
			}
		}
	},
});
