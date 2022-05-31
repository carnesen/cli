import { runAndCatch } from '@carnesen/run-and-catch';
import { parseNamedArgs } from '../parse-named-args';
import {
	dummyNonOptionalArgGroup,
	dummyOptionalArgGroup,
	DUMMY_ARG_GROUP_THROW,
} from '../dummy-arg-groups';
import { CCliUsageError } from '../c-cli-usage-error';

describe(parseNamedArgs.name, () => {
	it(`returns object of named values`, async () => {
		const namedValues = await parseNamedArgs(
			{ foo: dummyNonOptionalArgGroup, baz: dummyNonOptionalArgGroup },
			{ foo: ['bar'], baz: ['bop'] },
		);
		expect(namedValues).toEqual({
			foo: dummyNonOptionalArgGroup.parse(['bar']),
			baz: dummyNonOptionalArgGroup.parse(['bop']),
		});
	});

	it(`re-throws error with name-specific context if parse does`, async () => {
		const exception = await runAndCatch(
			parseNamedArgs,
			{ foo123: dummyOptionalArgGroup },
			{ foo123: [DUMMY_ARG_GROUP_THROW] },
		);
		expect(exception.message).toMatch('--foo123');
		expect(exception.message).toMatchSnapshot();
	});

	it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
		const exception = await runAndCatch(
			parseNamedArgs,
			{ foo123: dummyOptionalArgGroup },
			{ foo1234: [] },
		);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch('--foo1234 : Unknown named argument');
	});
});
