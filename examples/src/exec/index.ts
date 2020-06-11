import {
	CliCommand,
	CliStringArrayValuedParser,
	Cli,
	runCliAndExit,
} from '@carnesen/cli';

// Exported because this is also a child of a branch
export const npmStartEscapedArguments = CliCommand({
	name: 'npm-start-escaped-arguments',
	description: `
	You might be familiar with the usage for "npm start":
	
	npm start [-- <args>]

	https://docs.npmjs.com/cli/start.html

	This "--" pattern is used in a CLI when <args> might have _values_ like "--name".
	Normally "--name" would be interpreted by the CLI as a named argument separator. 
	The "--" means, "Stop interpreting --whatever as a named argument separator. Just
	pass all the arguments after -- into the escapedParser ICliParser.".
	`,
	escapedParser: CliStringArrayValuedParser({
		required: true,
		placeholder: '<command> [<arguments>]',
	}),
	action(_, __, escaped) {
		return `
npm start -- ${escaped.join(' ')}

(This is just a mock command)
		`;
	},
});

// Exported for unit testing
export const cli = Cli(npmStartEscapedArguments);

// So that we can run this module as a standalone CLI
if (module === require.main) {
	runCliAndExit(cli);
}
