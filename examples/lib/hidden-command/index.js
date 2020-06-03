#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const cli_1 = require("@carnesen/cli");
const echo_1 = require("../echo");
const hiddenEcho = cli_1.CliCommand({
    ...echo_1.echo,
    name: 'hidden-echo',
    description: 'This command is a clone of "echo" but with "hidden" set to true',
    hidden: true,
});
exports.root = cli_1.CliBranch({
    name: 'cli',
    description: `
    Non-hidden command "${echo_1.echo.name}" shows up in this usage documentation.
    Hidden subcommand "${hiddenEcho.name}" does not appear in the subcommands list.`,
    subcommands: [hiddenEcho, echo_1.echo],
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.root);
}
//# sourceMappingURL=index.js.map