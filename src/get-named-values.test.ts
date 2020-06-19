import { runAndCatch } from '@carnesen/run-and-catch';
import { getNamedValues } from './get-named-values';
import {
	dummyRequiredArgGroup,
	dummyArgGroup,
	DUMMY_ARG_GROUP_THROW,
} from './dummy-arg-groups-for-testing';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import { CliCommand } from './cli-command';
import { CliCommandNode } from './cli-node';

const node: CliCommandNode = {
	current: CliCommand({ name: 'foo', action() {} }),
	parents: [],
};

describe(getNamedValues.name, () => {
	it(`returns object of named values`, async () => {
		const namedValues = await getNamedValues(
			{ foo: dummyRequiredArgGroup, baz: dummyRequiredArgGroup },
			{ foo: ['bar'], baz: ['bop'] },
			node,
		);
		expect(namedValues).toEqual({
			foo: dummyRequiredArgGroup.parse(['bar']),
			baz: dummyRequiredArgGroup.parse(['bop']),
		});
	});

	it(`re-throws error with name-specific context if parse does`, async () => {
		const exception = await runAndCatch(
			getNamedValues,
			{ foo123: dummyArgGroup },
			{ foo123: [DUMMY_ARG_GROUP_THROW] },
			node,
		);
		expect(exception.message).toMatch('--foo123');
		expect(exception.message).toMatchSnapshot();
	});

	it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
		const exception = await runAndCatch(
			getNamedValues,
			{ foo123: dummyArgGroup },
			{ foo1234: [] },
			node,
		);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch('--foo1234 : Unknown named argument');
	});
});
