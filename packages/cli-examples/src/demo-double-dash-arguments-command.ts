import { CliCommand, CliStringArrayArgGroup, CliWordMark } from '@carnesen/cli';

/**
 * A CliCommand that demonstrates "double dash" arguments
 */
export const demoDoubleDashArgumentsCommand = CliCommand({
	name: 'demo-double-dash-arguments',
	description(input) {
		return `
		Demonstrate usage of double-dash arguments

		You might be familiar with the -- pattern from such CLI commands as:
		
		npm start [-- <args>]

		kubectl exec POD -- COMMAND [args...] [options]

		In a ${CliWordMark(input)} CLI, 
		all command-line arguments after a lone --
		are passed into the command's doubleDashArgGroup. Specifically, after 
		-- things like --name aren't interpreted as argument group separators. 
		This is particularly useful for passing arguments through to another 
		command like "do -- git --version".
	`;
	},
	doubleDashArgGroup: CliStringArrayArgGroup({
		required: true,
		placeholder: '<command> [<arguments>]',
	}),
	action({ doubleDashValue: args }) {
		return `
Running ${args.join(' ')}

(Not really this is just a mock command for demoing double-dash arguments)
		`;
	},
});
