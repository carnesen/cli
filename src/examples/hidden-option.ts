import { echoCliCommand as echoCommand } from './echo';
import { CliCommand } from '../cli-command';
import { CliFlagArgParser } from '../arg-parsers/cli-flag-arg-parser';
import { runCliAndExit } from '../run-cli-and-exit';

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

// All alwaysCLI abstractions are plain-old JavaScript objects and functions.
// This makes it easy to re-use bits of existing commands and/or argParsers.
export const root = CliCommand({
  ...echoCommand,
  description: `
    This CLI has a hidden option "--pizza". If an option is "hidden", it does not 
    appear in the command's usage documentation. Hidden options might be "easter eggs" 
    like in this example or experimental features, for example.`,
  namedArgParsers: { pizza: CliFlagArgParser({ hidden: true }) },
  action(messages, { pizza }, escaped) {
    if (pizza) {
      return PIZZA_MESSAGE;
    }
    return echoCommand.action(messages, {}, escaped);
  },
});

if (module === require.main) {
  runCliAndExit(root);
}
