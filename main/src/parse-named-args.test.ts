import { runAndCatch } from '@carnesen/run-and-catch';
import { parseNamedArgs } from './parse-named-args';
import {
	dummyRequiredArgGroup,
	dummyArgGroup,
	DUMMY_ARG_GROUP_THROW,
} from './dummy-arg-groups-for-testing';
import { CLI_USAGE_ERROR } from './cli-usage-error';

describe(parseNamedArgs.name, () => {
	it(`returns object of named values`, async () => {
		const namedValues = await parseNamedArgs(
			{ foo: dummyRequiredArgGroup, baz: dummyRequiredArgGroup },
			{ foo: ['bar'], baz: ['bop'] },
		);
		expect(namedValues).toEqual({
			foo: dummyRequiredArgGroup.parse(['bar']),
			baz: dummyRequiredArgGroup.parse(['bop']),
		});
	});

	it(`re-throws error with name-specific context if parse does`, async () => {
		const exception = await runAndCatch(
			parseNamedArgs,
			{ foo123: dummyArgGroup },
			{ foo123: [DUMMY_ARG_GROUP_THROW] },
		);
		expect(exception.message).toMatch('--foo123');
		expect(exception.message).toMatchSnapshot();
	});

	it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
		const exception = await runAndCatch(
			parseNamedArgs,
			{ foo123: dummyArgGroup },
			{ foo1234: [] },
		);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch('--foo1234 : Unknown named argument');
	});
});
