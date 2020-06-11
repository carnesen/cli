import {
	Cli,
	CliBooleanValuedParser,
	CliCommand,
	CliStringArrayValuedParser,
	runCliAndExit,
} from '@carnesen/cli';

const PIZZA_MESSAGE = `
       _              
      (_)             
__ __  _ __________ _ 
| '_ \\| |_  /_  / _' |
| |_) | |/ / / / (_| |
| .__/|_/___/___\\__,_|
| |                   
|_|                   
`;

export const echoWithHiddenOption = CliCommand({
	name: 'echo-with-hidden-option',
	positionalParser: CliStringArrayValuedParser({
		required: true,
	}),
	description: `
    This CLI has a hidden option "--pizza". If an option is "hidden", it does not 
    appear in the command's usage documentation. Hidden options might be "easter eggs" 
    like in this example or experimental features.`,
	namedParsers: {
		pizza: CliBooleanValuedParser({ hidden: true }),
	},
	action(messages, { pizza }) {
		if (pizza) {
			return PIZZA_MESSAGE;
		}
		return messages.join(' ');
	},
});

// Exported for unit testing
export const cli = Cli(echoWithHiddenOption);

if (module === require.main) {
	runCliAndExit(cli);
}
