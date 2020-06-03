"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_usage_error_1 = require("../cli-usage-error");
const cli_string_array_arg_parser_1 = require("./cli-string-array-arg-parser");
const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;
const argParser = cli_string_array_arg_parser_1.CliStringArrayArgParser({ description, hidden, placeholder, required });
describe(cli_string_array_arg_parser_1.CliStringArrayArgParser.name, () => {
    it('parse returns is args converted to numbers', () => {
        expect(argParser.parse(['0', '1', '2'])).toEqual(['0', '1', '2']);
    });
    it('parse returns `undefined` if args is', () => {
        expect(argParser.parse(undefined)).toBe(undefined);
    });
    it('parse throws USAGE error "expected one or more" if args is an empty array', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, []);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/expected one or more/i);
        expect(exception.message).toMatch(placeholder);
    });
    it('attaches config properties', () => {
        expect(argParser.description).toBe(description);
        expect(argParser.hidden).toBe(hidden);
        expect(argParser.placeholder).toBe(placeholder);
        expect(argParser.required).toBe(required);
    });
    it('config is not required', () => {
        cli_string_array_arg_parser_1.CliStringArrayArgParser();
    });
});
//# sourceMappingURL=cli-string-array-arg-parser.test.js.map