"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyRequiredArgParser = exports.dummyArgParser = exports.DUMMY_ARG_PARSER_THROW_NON_TRUTHY = exports.DUMMY_ARG_PARSER_THROW = exports.DUMMY_ARG_PARSER_THROWN_INTENTIONALLY = exports.DUMMY_ARG_PARSER_EMPTY_ARRAY_WAS_PASSED = exports.DUMMY_ARG_PARSER_UNDEFINED_WAS_PASSED = void 0;
exports.DUMMY_ARG_PARSER_UNDEFINED_WAS_PASSED = 'undefined was passed';
exports.DUMMY_ARG_PARSER_EMPTY_ARRAY_WAS_PASSED = 'undefined was passed';
exports.DUMMY_ARG_PARSER_THROWN_INTENTIONALLY = 'thrown intentionally';
exports.DUMMY_ARG_PARSER_THROW = 'throw';
exports.DUMMY_ARG_PARSER_THROW_NON_TRUTHY = 'throw-non-truthy';
exports.dummyArgParser = {
    placeholder: '',
    parse(args) {
        if (typeof args === 'undefined') {
            return exports.DUMMY_ARG_PARSER_UNDEFINED_WAS_PASSED;
        }
        if (args.length === 0) {
            return exports.DUMMY_ARG_PARSER_EMPTY_ARRAY_WAS_PASSED;
        }
        if (args[0] === exports.DUMMY_ARG_PARSER_THROW) {
            throw new Error(exports.DUMMY_ARG_PARSER_THROWN_INTENTIONALLY);
        }
        if (args[0] === exports.DUMMY_ARG_PARSER_THROW_NON_TRUTHY) {
            // eslint-disable-next-line no-throw-literal
            throw '';
        }
        return args[0];
    },
};
exports.dummyRequiredArgParser = {
    placeholder: '<foo>',
    required: true,
    parse: exports.dummyArgParser.parse,
};
//# sourceMappingURL=dummy-arg-parsers-for-testing.js.map