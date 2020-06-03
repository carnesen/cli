"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliStringArrayArgParser = void 0;
const cli_usage_error_1 = require("../cli-usage-error");
function CliStringArrayArgParser(config = {}) {
    const { required = false, description, placeholder = '<str0> [...]', hidden = false, } = config;
    const argParser = {
        required,
        hidden,
        placeholder,
        parse(args) {
            if (!args) {
                return undefined;
            }
            if (args.length === 0) {
                throw new cli_usage_error_1.CliUsageError(`Expected one or more values ${placeholder}`);
            }
            return args;
        },
        description,
    };
    return argParser;
}
exports.CliStringArrayArgParser = CliStringArrayArgParser;
//# sourceMappingURL=cli-string-array-arg-parser.js.map