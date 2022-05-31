import { c, CCliWordMark } from '@carnesen/cli';

/** A **@carnesen/cli** command that demonstrates "double dash" arguments */
export const demoDoubleDashArgumentsCommand = c.command({
	name: 'demo-double-dash-arguments',
	description(input) {
		return `
		Demonstrate usage of double-dash arguments

		You might be familiar with the -- pattern from such CLI commands as:
		
		npm start [-- <args>]

		kubectl exec POD -- COMMAND [args...] [options]

		In a ${CCliWordMark(input)} CLI, 
		all command-line arguments after a lone --
		are passed into the command's doubleDashArgGroup. Specifically, after 
		-- things like --name aren't interpreted as argument group separators. 
		This is particularly useful for passing arguments through to another 
		command like "do -- git --version".
	`;
	},
	doubleDashArgGroup: c.stringArray({
		placeholder: '<command> [<arguments>]',
	}),
	action({ doubleDashValue: args }) {
		return `
Running ${args.join(' ')}

(Not really this is just a mock command for demoing double-dash arguments)
		`;
	},
});
