"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const get_named_values_1 = require("./get-named-values");
const dummy_arg_parsers_for_testing_1 = require("./dummy-arg-parsers-for-testing");
const cli_usage_error_1 = require("./cli-usage-error");
const cli_command_1 = require("./cli-command");
const commandStack = {
    current: cli_command_1.CliCommand({ name: 'foo', action() { } }),
    parents: [],
};
describe(get_named_values_1.getNamedValues.name, () => {
    it(`returns object of named values`, async () => {
        const namedValues = await get_named_values_1.getNamedValues({ foo: dummy_arg_parsers_for_testing_1.dummyRequiredArgParser, baz: dummy_arg_parsers_for_testing_1.dummyRequiredArgParser }, { foo: ['bar'], baz: ['bop'] }, commandStack);
        expect(namedValues).toEqual({
            foo: dummy_arg_parsers_for_testing_1.dummyRequiredArgParser.parse(['bar']),
            baz: dummy_arg_parsers_for_testing_1.dummyRequiredArgParser.parse(['bop']),
        });
    });
    it(`re-throws error with name-specific context if parse does`, async () => {
        const exception = await run_and_catch_1.runAndCatch(get_named_values_1.getNamedValues, { foo123: dummy_arg_parsers_for_testing_1.dummyArgParser }, { foo123: [dummy_arg_parsers_for_testing_1.DUMMY_ARG_PARSER_THROW] }, commandStack);
        expect(exception.message).toMatch('--foo123');
        expect(exception.message).toMatchSnapshot();
    });
    it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
        const exception = await run_and_catch_1.runAndCatch(get_named_values_1.getNamedValues, { foo123: dummy_arg_parsers_for_testing_1.dummyArgParser }, { foo1234: [] }, commandStack);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch('--foo1234 : Unknown named argument');
    });
});
//# sourceMappingURL=get-named-values.test.js.map