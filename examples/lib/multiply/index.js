#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = void 0;
const cli_1 = require("@carnesen/cli");
exports.multiply = cli_1.CliCommand({
    name: 'multiply',
    description: 'Multiply numbers and print the result',
    positionalArgParser: cli_1.CliNumberArrayArgParser({
        required: true,
    }),
    action(numbers) {
        return numbers.reduce((a, b) => a * b, 1);
    },
});
if (require.main === module) {
    cli_1.runCliAndExit(exports.multiply);
}
//# sourceMappingURL=index.js.map