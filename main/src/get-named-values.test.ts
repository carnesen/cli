import { runAndCatch } from '@carnesen/run-and-catch';
import { getNamedValues } from './get-named-values';
import {
	dummyRequiredValuedParser,
	dummyValuedParser,
	DUMMY_ARG_PARSER_THROW,
} from './dummy-arg-parsers-for-testing';
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
			{ foo: dummyRequiredValuedParser, baz: dummyRequiredValuedParser },
			{ foo: ['bar'], baz: ['bop'] },
			node,
		);
		expect(namedValues).toEqual({
			foo: dummyRequiredValuedParser.parse(['bar']),
			baz: dummyRequiredValuedParser.parse(['bop']),
		});
	});

	it(`re-throws error with name-specific context if parse does`, async () => {
		const exception = await runAndCatch(
			getNamedValues,
			{ foo123: dummyValuedParser },
			{ foo123: [DUMMY_ARG_PARSER_THROW] },
			node,
		);
		expect(exception.message).toMatch('--foo123');
		expect(exception.message).toMatchSnapshot();
	});

	it(`throws USAGE error "Unknown argument name" with context if an unknown named argument is passed`, async () => {
		const exception = await runAndCatch(
			getNamedValues,
			{ foo123: dummyValuedParser },
			{ foo1234: [] },
			node,
		);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch('--foo1234 : Unknown named argument');
	});
});
