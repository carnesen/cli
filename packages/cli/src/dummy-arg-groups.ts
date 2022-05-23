import {
	CCliAbstractArgGroup,
	CCliParseArgs,
} from './c-cli-abstract-arg-group';

export const DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED = 'undefined was passed';
export const DUMMY_ARG_GROUP_EMPTY_ARRAY_WAS_PASSED = 'undefined was passed';
export const DUMMY_ARG_GROUP_THROWN_INTENTIONALLY = 'thrown intentionally';
export const DUMMY_ARG_GROUP_THROW = 'throw';
export const DUMMY_ARG_GROUP_THROW_NON_TRUTHY = 'throw-non-truthy';

export class DummyOptionalArgGroup extends CCliAbstractArgGroup<string, false> {
	public parse(args: CCliParseArgs<false>): string {
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
	}

	public static create(): DummyOptionalArgGroup {
		return new DummyOptionalArgGroup({ required: false });
	}
}

export const dummyArgGroup = DummyOptionalArgGroup.create();

export class DummyRequiredArgGroup extends CCliAbstractArgGroup<string, true> {
	public parse(args: string[]): string {
		return dummyArgGroup.parse(args);
	}

	public static create(): DummyRequiredArgGroup {
		return new DummyRequiredArgGroup({ required: true, placeholder: '<foo>' });
	}
}

export const dummyRequiredArgGroup = DummyRequiredArgGroup.create();
