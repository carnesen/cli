"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_one_of_arg_parser_1 = require("./cli-one-of-arg-parser");
const cli_usage_error_1 = require("../cli-usage-error");
const description = 'foo bar baz';
const hidden = true;
const placeholder = '<special>';
const required = false;
const argParser = cli_one_of_arg_parser_1.CliOneOfArgParser({
    values: ['foo', 'bar'],
    description,
    hidden,
    placeholder,
    required,
});
describe(cli_one_of_arg_parser_1.CliOneOfArgParser.name, () => {
    it('parse returns the zeroth element of args', () => {
        expect(argParser.parse(['foo'])).toBe('foo');
    });
    it('parse throws usage error "expected one of" if args is an empty array', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, []);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/expected <special> to be one of/i);
        expect(exception.message).toMatch(/foo, bar/i);
    });
    it('parse throws usage error "invalid argument ... expected one of" if args has a bad value', async () => {
        const exception = await run_and_catch_1.runAndCatch(argParser.parse, ['baz']);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/expected <special> to be one of/i);
        expect(exception.message).toMatch(placeholder);
    });
    it('returns undefined if args is', () => {
        const argParser2 = cli_one_of_arg_parser_1.CliOneOfArgParser({ values: ['foo', 'bar'] });
        expect(argParser2.parse(undefined)).toBe(undefined);
    });
    it('attaches config properties', () => {
        expect(argParser.description).toMatch(description);
        expect(argParser.hidden).toBe(hidden);
        expect(argParser.placeholder).toBe(placeholder);
        expect(argParser.required).toBe(required);
    });
});
//# sourceMappingURL=cli-one-of-arg-parser.test.js.map