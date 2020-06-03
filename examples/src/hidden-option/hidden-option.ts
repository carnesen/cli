#!/usr/bin/env node
import {
	CliCommand,
	CliFlagArgParser,
	runCliAndExit,
} from '@carnesen/cli';
import { echo } from '../echo';

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

// A CliCommand is a plain-old JavaScript/TypeScript object that we can clone using object
// spread notation.
export const rootCommand = CliCommand({
	...echo,
	description: `
    This CLI has a hidden option "--pizza". If an option is "hidden", it does not 
    appear in the command's usage documentation. Hidden options might be "easter eggs" 
    like in this example or experimental features, for example.`,
	namedArgParsers: {
		pizza: CliFlagArgParser({ hidden: true }),
	},
	action(messages, { pizza }, escaped) {
		if (pizza) {
			return PIZZA_MESSAGE;
		}
		return echo.action(messages, {}, escaped);
	},
});

if (module === require.main) {
	runCliAndExit(rootCommand);
}
