"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliOneOfArgParser = void 0;
const cli_usage_error_1 = require("../cli-usage-error");
const util_1 = require("../util");
function CliOneOfArgParser(config) {
    const valuesString = util_1.wrapInCurlyBrackets(config.values.join(', '));
    const { required = false, description, placeholder = '<value>', hidden = false, } = config;
    const argParser = {
        required,
        placeholder: config.placeholder || '<value>',
        hidden,
        parse(args) {
            if (!args) {
                return undefined;
            }
            if (args.length !== 1) {
                throw new cli_usage_error_1.CliUsageError(`Expected ${placeholder} to be one of ${valuesString}`);
            }
            if (!config.values.includes(args[0])) {
                throw new cli_usage_error_1.CliUsageError(`Invalid argument "${args[0]}". Expected ${placeholder} to be one of ${valuesString}`);
            }
            return args[0];
        },
        description: `${util_1.regularizeText(description)}\nAllowed values ${valuesString}`,
    };
    return argParser;
}
exports.CliOneOfArgParser = CliOneOfArgParser;
//# sourceMappingURL=cli-one-of-arg-parser.js.map