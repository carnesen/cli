#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootCommand = void 0;
const cli_1 = require("@carnesen/cli");
const echo_1 = require("../echo");
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
exports.rootCommand = cli_1.CliCommand({
    ...echo_1.echo,
    description: `
    This CLI has a hidden option "--pizza". If an option is "hidden", it does not 
    appear in the command's usage documentation. Hidden options might be "easter eggs" 
    like in this example or experimental features, for example.`,
    namedArgParsers: {
        pizza: cli_1.CliFlagArgParser({ hidden: true }),
    },
    action(messages, { pizza }, escaped) {
        if (pizza) {
            return PIZZA_MESSAGE;
        }
        return echo_1.echo.action(messages, {}, escaped);
    },
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.rootCommand);
}
//# sourceMappingURL=hidden-option.js.map