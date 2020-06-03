"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_usage_error_1 = require("../cli-usage-error");
const cli_string_arg_parser_1 = require("./cli-string-arg-parser");
const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;
const argParser = cli_string_arg_parser_1.CliStringArgParser({ required, description, hidden, placeholder });
describe(cli_string_arg_parser_1.CliStringArgParser.name, () => {
    it('returns `undefined` if args is `undefined` and no defaultValue has been provided', () => {
        expect(argParser.parse(undefined)).toBe(undefined);
    });
    it('returns defaultValue if args is `undefined` and defaultValue has been provided', () => {
        const argParser2 = cli_string_arg_parser_1.CliStringArgParser({ defaultValue: '0' });
        expect(argParser2.parse(undefined)).toBe('0');
    });
    it('parse returns the zeroth element of args', () => {
        expect(argParser.parse(['1'])).toBe('1');
    });
    it('throws UsageError "expected just one" if args has more than one element', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, ['0', '1']);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/expected just one/i);
        expect(exception.message).toMatch(placeholder);
    });
    it('throws UsageError "expected a" if args is an empty array', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, []);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/expected a/i);
        expect(exception.message).toMatch(placeholder);
    });
    it('attaches config properties', () => {
        expect(argParser.description).toBe(description);
        expect(argParser.hidden).toBe(hidden);
        expect(argParser.placeholder).toBe(placeholder);
        expect(argParser.required).toBe(required);
    });
    it('config is not required', () => {
        cli_string_arg_parser_1.CliStringArgParser();
    });
});
//# sourceMappingURL=cli-string-arg-parser.test.js.map