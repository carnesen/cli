"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNamedValues = void 0;
const parse_args_1 = require("./parse-args");
const cli_usage_error_1 = require("./cli-usage-error");
async function getNamedValues(namedArgParsers, namedArgs, commandStack) {
    const namedValues = {};
    const restNamedArgs = { ...namedArgs };
    const asyncFuncs = [];
    for (const [name, argParser] of Object.entries(namedArgParsers)) {
        const args = restNamedArgs[name];
        delete restNamedArgs[name];
        asyncFuncs.push(async () => {
            const value = await parse_args_1.parseArgs(argParser, args, `--${name}`, commandStack);
            namedValues[name] = value;
        });
    }
    const restNames = Object.keys(restNamedArgs);
    if (restNames[0]) {
        throw new cli_usage_error_1.CliUsageError(`--${restNames[0]} : Unknown named argument`, commandStack);
    }
    await Promise.all(asyncFuncs.map((asyncFunc) => asyncFunc()));
    return namedValues;
}
exports.getNamedValues = getNamedValues;
//# sourceMappingURL=get-named-values.js.map