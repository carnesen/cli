import {
	Cli,
	CliCommand,
	CliOneOfArgGroup,
	CliStringArgGroup,
	runCliAndExit,
	CliUsageError,
	CliTerseError,
} from '@carnesen/cli';
/**
 * Exported because this is a subcommand of the top-level branch in ../index.ts
 * */
export const throwError = CliCommand({
	name: 'throw',
	description: 'Throw an error in the command to see how the CLI behaves',
	namedArgGroups: {
		message: CliStringArgGroup({
			description: 'A message',
			required: true,
		}),
		class: CliOneOfArgGroup({
			values: ['usage' as const, 'terse' as const],
			required: false,
			description: `Throw a regular Error (default), a UsageError, or a TerseError`,
		}),
	},
	// `class` is a reserved word so let's name our variable `class_`
	action(_, { message, class: class_ }) {
		switch (class_) {
			case 'usage': {
				throw new CliUsageError(message);
			}
			case 'terse': {
				throw new CliTerseError(message);
			}
			default: {
				throw new Error(message);
			}
		}
	},
});

/** Exported for unit testing */
export const cli = Cli(throwError);

/** So that we can run this module directly as a CLI */
if (module === require.main) {
	runCliAndExit(cli);
}
