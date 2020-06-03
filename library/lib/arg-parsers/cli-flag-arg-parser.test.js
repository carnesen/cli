"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_flag_arg_parser_1 = require("./cli-flag-arg-parser");
const cli_usage_error_1 = require("../cli-usage-error");
const description = 'foo bar baz';
const hidden = true;
const argParser = cli_flag_arg_parser_1.CliFlagArgParser({ description, hidden });
describe(cli_flag_arg_parser_1.CliFlagArgParser.name, () => {
    it('always has "required" set to false', () => {
        expect(argParser.required).toBe(false);
    });
    it('parse returns false if args is undefined', () => {
        expect(argParser.parse(undefined)).toBe(false);
    });
    it('parse returns true if args is an empty array', () => {
        expect(argParser.parse([])).toBe(true);
    });
    it('parse throws a usage error "unexpected argument" if args has a value', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, ['foo']);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/unexpected argument/i);
        expect(exception.message).toMatch('"foo"');
    });
    it('attaches passed properties "description" and "hidden"', () => {
        expect(argParser.description).toBe(description);
        expect(argParser.hidden).toBe(hidden);
    });
    it('config is optional', () => {
        expect(cli_flag_arg_parser_1.CliFlagArgParser().hidden).toBe(false);
    });
});
//# sourceMappingURL=cli-flag-arg-parser.test.js.map