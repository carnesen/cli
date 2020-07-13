import { ICliArgGroup } from './cli-arg-group';

export const DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED = 'undefined was passed';
export const DUMMY_ARG_GROUP_EMPTY_ARRAY_WAS_PASSED = 'undefined was passed';
export const DUMMY_ARG_GROUP_THROWN_INTENTIONALLY = 'thrown intentionally';
export const DUMMY_ARG_GROUP_THROW = 'throw';
export const DUMMY_ARG_GROUP_THROW_NON_TRUTHY = 'throw-non-truthy';

export const dummyArgGroup: ICliArgGroup<string, false> = {
	placeholder: '',
	parse(args) {
		if (typeof args === 'undefined') {
			return DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED;
		}
		if (args.length === 0) {
			return DUMMY_ARG_GROUP_EMPTY_ARRAY_WAS_PASSED;
		}
		switch (args[0]) {
			case DUMMY_ARG_GROUP_THROW: {
				throw new Error(DUMMY_ARG_GROUP_THROWN_INTENTIONALLY);
			}
			case DUMMY_ARG_GROUP_THROW_NON_TRUTHY: {
				// eslint-disable-next-line no-throw-literal
				throw '';
			}
			default: {
				return args[0];
			}
		}
	},
};

export const dummyRequiredArgGroup: ICliArgGroup<string, true> = {
	placeholder: '<foo>',
	required: true,
	parse: dummyArgGroup.parse,
};
