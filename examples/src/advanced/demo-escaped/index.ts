import {
	CliCommand,
	CliStringArrayArgGroup,
	Cli,
	runCliAndExit,
} from '@carnesen/cli';

// Exported because this is also a child of a branch
export const demoEscapedArguments = CliCommand({
	name: 'demo-escaped-arguments',
	description: `
	You might be familiar with the usage for "npm start":
	
	npm start [-- <args>]

	https://docs.npmjs.com/cli/start.html

	The "--" means, "Stop interpreting words that start with '--' 
	as a named argument flags. Just pass all the args after '--' 
	into the escapedArgGroup ICliArgGroup.".
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

// Exported for unit testing
export const cli = Cli(demoEscapedArguments);

// So that we can run this module as a standalone CLI
if (module === require.main) {
	runCliAndExit(cli);
}
