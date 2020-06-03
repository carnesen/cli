#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwSpecialError = void 0;
const coded_error_1 = require("@carnesen/coded-error");
const cli_1 = require("@carnesen/cli");
exports.throwSpecialError = cli_1.CliCommand({
    name: 'throw-special-error',
    description: 'Throw a special error in this command\'s "action" function',
    namedArgParsers: {
        message: cli_1.CliStringArgParser({
            description: 'A message',
            required: true,
        }),
        code: cli_1.CliOneOfArgParser({
            values: ['usage', 'terse'],
            required: false,
            description: `Throw a UsageError, TerseError, or regular Error`,
        }),
    },
    action(_, { message, code }) {
        throw new coded_error_1.CodedError(message, code);
    },
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.throwSpecialError);
}
//# sourceMappingURL=index.js.map