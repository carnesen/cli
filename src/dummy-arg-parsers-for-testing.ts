import { CliArgParser } from './types';

export const DUMMY_ARG_PARSER_UNDEFINED_WAS_PASSED = 'undefined was passed';
export const DUMMY_ARG_PARSER_EMPTY_ARRAY_WAS_PASSED = 'undefined was passed';
export const DUMMY_ARG_PARSER_THROWN_INTENTIONALLY = 'thrown intentionally';
export const DUMMY_ARG_PARSER_THROW = 'throw';
export const DUMMY_ARG_PARSER_THROW_NON_TRUTHY = 'throw-non-truthy';

export const dummyArgParser: CliArgParser<string, false> = {
  placeholder: '',
  getValue(argv) {
    if (typeof argv === 'undefined') {
      return DUMMY_ARG_PARSER_UNDEFINED_WAS_PASSED;
    }
    if (argv.length === 0) {
      return DUMMY_ARG_PARSER_EMPTY_ARRAY_WAS_PASSED;
    }
    if (argv[0] === DUMMY_ARG_PARSER_THROW) {
      throw new Error(DUMMY_ARG_PARSER_THROWN_INTENTIONALLY);
    }
    if (argv[0] === DUMMY_ARG_PARSER_THROW_NON_TRUTHY) {
      // eslint-disable-next-line no-throw-literal
      throw '';
    }
    return argv[0];
  },
};

export const dummyRequiredArgParser: CliArgParser<string, true> = {
  placeholder: '<foo>',
  required: true,
  getValue: dummyArgParser.getValue,
};
