#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.echo = void 0;
const cli_1 = require("@carnesen/cli");
exports.echo = cli_1.CliCommand({
    name: 'echo',
    description: 'Write arguments to standard output (stdout)',
    positionalArgParser: cli_1.CliStringArrayArgParser({
        required: true,
    }),
    action(messages) {
        const text = messages.join(' ');
        return text;
    },
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.echo);
}
//# sourceMappingURL=index.js.map