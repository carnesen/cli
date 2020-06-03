"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_usage_error_1 = require("../cli-usage-error");
const cli_json_arg_parser_1 = require("./cli-json-arg-parser");
const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = true;
const argParser = cli_json_arg_parser_1.CliJsonArgParser({ description, hidden, placeholder, required });
describe(cli_json_arg_parser_1.CliJsonArgParser.name, () => {
    it('parse returns undefined if args is undefined', () => {
        expect(argParser.parse(undefined)).toBe(undefined);
    });
    it('parse returns parsed JSON if args is an array with one JSON-parsable string', () => {
        expect(argParser.parse(['"foo"'])).toBe('foo');
    });
    it('parse throws a usage error "expected a single" if args is an array with zero or more than one items', async () => {
        for (const args of [[], ['', '']]) {
            const exception = await run_and_catch_1.runAndCatch(argParser.parse, args);
            expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
            expect(exception.message).toMatch(/expected a single/i);
            expect(exception.message).toMatch(placeholder);
        }
    });
    it('parse throws a good usage error if the string in args is not parsable', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, ['foo']);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch("while parsing near 'foo'");
    });
    it('attaches config properties', () => {
        expect(argParser.description).toBe(description);
        expect(argParser.hidden).toBe(hidden);
        expect(argParser.placeholder).toBe(placeholder);
        expect(argParser.required).toBe(required);
    });
    it('config is optional', () => {
        expect(cli_json_arg_parser_1.CliJsonArgParser().hidden).toBe(false);
    });
});
//# sourceMappingURL=cli-json-arg-parser.test.js.map