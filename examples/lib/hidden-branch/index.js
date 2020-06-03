#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootBranch = void 0;
const cli_1 = require("@carnesen/cli");
const echo_1 = require("../echo");
const normalBranch = cli_1.CliBranch({
    name: 'non-hidden',
    description: `
    This is a normal non-hidden command branch.
    Its "description" shows up in command usage docs.`,
    subcommands: [echo_1.echo],
});
const hiddenBranch = cli_1.CliBranch({
    name: 'secret',
    description: `
    This is a command branch that has hidden=true.
    It does not show up in the list of "subcommands",
    but it is otherwise fully functional.`,
    hidden: true,
    subcommands: [echo_1.echo],
});
exports.rootBranch = cli_1.CliBranch({
    name: 'cli',
    description: 'This CLI has a hidden branch called "secret".',
    subcommands: [normalBranch, hiddenBranch],
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.rootBranch);
}
//# sourceMappingURL=index.js.map