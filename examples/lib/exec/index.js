#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
const cli_1 = require("@carnesen/cli");
exports.exec = cli_1.CliCommand({
    name: 'exec',
    description: 'Run a shell command',
    escapedArgParser: cli_1.CliStringArrayArgParser({
        required: true,
        placeholder: '<command> [<arguments>]',
    }),
    action(_, __, escaped) {
        const command = escaped.join(' ');
        const output = child_process_1.execSync(command, {
            encoding: 'utf8',
        });
        return output;
    },
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.exec);
}
//# sourceMappingURL=index.js.map