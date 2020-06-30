import {
	CliBooleanArgGroup,
	CliCommand,
	CliStringArrayArgGroup,
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

export const echoPizzaCommand = CliCommand({
	name: 'echo-pizza',
	positionalArgGroup: CliStringArrayArgGroup(),
	description: `
		Just like "echo" but with a hidden flag "--pizza"

		A hidden option doesn't appear in the command's usage documentation.
		Hidden options could be "easter eggs" like this one or internal or
		experimental features, anything that you don't want to expose as part of the
		command's public API.`,
	namedArgGroups: {
		pizza: CliBooleanArgGroup({ hidden: true }),
	},
	action(messages, { pizza }) {
		let text = messages ? messages.join(' ') : '';
		if (pizza) {
			text += PIZZA_MESSAGE;
		}
		return text;
	},
});
