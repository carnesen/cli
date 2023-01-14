import { c, CCliTerseError, CCliUsageError } from '@carnesen/cli';

/**
 * CLI command for demonstrating how errors are displayed
 * */
export const throwErrorCommand = c.command({
	name: 'throw-error',
	description: "Throw an error to see how they're displayed",
	namedArgGroups: {
		message: c.string({
			description: 'A message',
		}),
		kind: c.stringChoice({
			choices: ['terse', 'usage'] as const,
			optional: true,
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
		exitCode: c.number({
			description: 'Numeric status code to exit with',
			optional: true,
		}),
	},
	action({ namedValues: { message, kind, exitCode } }) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let error: any;
		switch (kind) {
			case 'usage': {
				error = new CCliUsageError(message);
				break;
			}
			case 'terse': {
				error = new CCliTerseError(message);
				break;
			}
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
