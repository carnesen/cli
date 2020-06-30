import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

/**
 * A CliCommand that demonstrates "escaped" arguments
 */
export const demoEscapedArgumentsCommand = CliCommand({
	name: 'demo-escaped-arguments',
	description: `
		Demonstrate usage of "escaped" arguments -- <args>

		You might be familiar with the "--" pattern from such CLI commands as:
		
		npm start [-- <args>]

		kubectl exec POD -- COMMAND [args...] [options]

		Once the @carnesen/cli argument parser sees a lone "--", it stops
		interpreting subsequent arguments of the form "--name" as named argument
		separators. All arguments after "--" are passed into the command's
		"escapedArgGroup".
	`,
	escapedArgGroup: CliStringArrayArgGroup({
		required: true,
		placeholder: '<command> [<arguments>]',
	}),
	action(_, __, escaped) {
		return `
Running ${escaped.join(' ')}

(Not really this is just a mock command for demoing escaped arguments)
		`;
	},
});
