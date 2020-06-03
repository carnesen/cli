"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const parse_args_1 = require("./parse-args");
const cli_usage_error_1 = require("./cli-usage-error");
const dummy_arg_parsers_for_testing_1 = require("./dummy-arg-parsers-for-testing");
const cli_command_1 = require("./cli-command");
const commandStack = {
    current: cli_command_1.CliCommand({ name: 'foo', action() { } }),
    parents: [],
};
describe(parse_args_1.parseArgs.name, () => {
    it(`returns parse(args) if an args with length >= 1 is passed`, async () => {
        const args = ['foo'];
        expect(await parse_args_1.parseArgs(dummy_arg_parsers_for_testing_1.dummyArgParser, args, undefined, commandStack)).toBe(dummy_arg_parsers_for_testing_1.dummyArgParser.parse(args));
        expect(await parse_args_1.parseArgs(dummy_arg_parsers_for_testing_1.dummyRequiredArgParser, args, undefined, commandStack)).toBe(dummy_arg_parsers_for_testing_1.dummyRequiredArgParser.parse(args));
    });
    it(`if not required, returns parse(args) if args is an empty array or undefined`, async () => {
        expect(await parse_args_1.parseArgs(dummy_arg_parsers_for_testing_1.dummyArgParser, [], undefined, commandStack)).toBe(dummy_arg_parsers_for_testing_1.dummyArgParser.parse([]));
        expect(await parse_args_1.parseArgs(dummy_arg_parsers_for_testing_1.dummyArgParser, undefined, undefined, commandStack)).toBe(dummy_arg_parsers_for_testing_1.dummyArgParser.parse(undefined));
    });
    it(`if required, throws usage error "argument is required" if args is an empty array or undefined`, async () => {
        for (const args of [undefined, []]) {
            const exception = await run_and_catch_1.runAndCatch(parse_args_1.parseArgs, dummy_arg_parsers_for_testing_1.dummyRequiredArgParser, args, undefined, commandStack);
            expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
            expect(exception.message).toMatch(/argument is required/i);
            expect(exception.message).toMatch(dummy_arg_parsers_for_testing_1.dummyRequiredArgParser.placeholder);
        }
    });
    it(`if throws "argParser is required", expect message to match snapshot`, async () => {
        const exception = await run_and_catch_1.runAndCatch(parse_args_1.parseArgs, dummy_arg_parsers_for_testing_1.dummyRequiredArgParser, undefined, undefined, commandStack);
        expect(exception.message).toMatchSnapshot();
    });
    it(`if throws "argParser is required" with context, expect message to match snapshot`, async () => {
        const exception = await run_and_catch_1.runAndCatch(parse_args_1.parseArgs, dummy_arg_parsers_for_testing_1.dummyRequiredArgParser, undefined, 'context', commandStack);
        expect(exception.message).toMatchSnapshot();
    });
    it(`throws if parse does with a context/placeholder enhanced message`, async () => {
        const exception = await run_and_catch_1.runAndCatch(parse_args_1.parseArgs, dummy_arg_parsers_for_testing_1.dummyArgParser, [dummy_arg_parsers_for_testing_1.DUMMY_ARG_PARSER_THROW], undefined, commandStack);
        expect(exception.message).toMatch(dummy_arg_parsers_for_testing_1.DUMMY_ARG_PARSER_THROWN_INTENTIONALLY);
        expect(exception.message).toMatch(dummy_arg_parsers_for_testing_1.dummyArgParser.placeholder);
        expect(exception.message).toMatchSnapshot();
    });
    it(`just re-throws exception if parse throws a non-truthy exception`, async () => {
        const exception = await run_and_catch_1.runAndCatch(parse_args_1.parseArgs, dummy_arg_parsers_for_testing_1.dummyArgParser, [dummy_arg_parsers_for_testing_1.DUMMY_ARG_PARSER_THROW_NON_TRUTHY], undefined, commandStack);
        expect(exception).not.toBeTruthy();
    });
});
//# sourceMappingURL=parse-args.test.js.map