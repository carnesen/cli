import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBranch } from './cli-branch';
import { CliLeaf } from './cli-leaf';
import { dummyArgParser } from './dummy-arg-parsers-for-testing';
import { CliArgRunner, CliEnhancer } from './cli-arg-runner';
import { findVersion } from './find-version';
import { CLI_USAGE_ERROR } from './cli-usage-error';

const leafWithNamedArgParsers = CliLeaf({
  name: 'leaf-with-named-args',
  namedArgParsers: {
    foo: dummyArgParser,
  },
  action(...args) {
    return args;
  },
});

const leafWithPositionalArgParser = CliLeaf({
  name: 'leaf-with-positional-args',
  positionalArgParser: dummyArgParser,
  action(...args) {
    return args;
  },
});

const leafWithEscapedArgParser = CliLeaf({
  name: 'leaf-with-escaped-arg-parser',
  escapedArgParser: dummyArgParser,
  action(...args) {
    return args;
  },
});

const root = CliBranch({
  name: 'cli',
  subcommands: [
    leafWithPositionalArgParser,
    leafWithNamedArgParsers,
    leafWithEscapedArgParser,
  ],
});

const cliArgRunner = CliArgRunner(root);

describe(CliArgRunner.name, () => {
  it('calls the enhancer if provided', async () => {
    const spy = jest.fn();
    const enhancer: CliEnhancer = (innerArgRunner) => async (...args: string[]) => {
      spy(...args);
      await innerArgRunner(...args);
    };
    const enhancedArgRunner = CliArgRunner(leafWithPositionalArgParser, {
      enhancer,
    });
    await enhancedArgRunner('foo', 'bar');
    expect(spy.mock.calls).toEqual([['foo', 'bar']]);
  });

  it('returns version string from package.json if "-v" or "--version" is passed', async () => {
    const version = await findVersion();
    expect(await cliArgRunner('-v')).toBe(version);
    expect(await cliArgRunner('--version')).toBe(version);
  });

  it('throws USAGE error with empty message if --help is passed', async () => {
    const exception = await runAndCatch(cliArgRunner, '--help');
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toBeFalsy();
  });

  it('throws USAGE error with empty message if last command is a branch and no additional args is present', async () => {
    const exception = await runAndCatch(cliArgRunner);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toBeFalsy();
  });

  it('throws USAGE error "bad command" if last command is a branch and additional args is present', async () => {
    const exception = await runAndCatch(cliArgRunner, 'oops');
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/bad command/i);
    expect(exception.message).toMatch('"oops"');
    expect(exception.message).toMatchSnapshot();
  });

  it('throws USAGE error "positional arguments" if last command is a leaf without positionalArgParser property and additional args is present', async () => {
    const exception = await runAndCatch(
      cliArgRunner,
      leafWithNamedArgParsers.name,
      'oops',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch('Unexpected argument "oops"');
    expect(exception.message).toMatch(leafWithNamedArgParsers.name);
    expect(exception.message).toMatch(/positional arguments/i);
    expect(exception.message).toMatchSnapshot();
  });

  it('Passes parsed positional value as first argument of the "action" function', async () => {
    const positionalArgs = ['foo', 'bar'];
    const result = await cliArgRunner(
      leafWithPositionalArgParser.name,
      ...positionalArgs,
    );
    expect(result).toEqual([dummyArgParser.getValue(positionalArgs), {}, undefined]);
  });

  it('Passes parsed named values as second argument of the "action" function', async () => {
    const namedArgs = ['--foo', 'bar'];
    const result = await cliArgRunner(leafWithNamedArgParsers.name, ...namedArgs);
    expect(result).toEqual([
      undefined,
      { foo: dummyArgParser.getValue(['bar']) },
      undefined,
    ]);
  });

  it(`Throws USAGE error 'does not allow "--"' if leaf does not have an "escaped" property`, async () => {
    const exception = await runAndCatch(
      cliArgRunner,
      leafWithPositionalArgParser.name,
      '--',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(leafWithPositionalArgParser.name);
    expect(exception.message).toMatch('does not allow "--"');
  });

  it('Passes parsed escaped value as third argument of the "action" function', async () => {
    const result = await cliArgRunner(leafWithEscapedArgParser.name, '--');
    expect(result).toEqual([
      undefined,
      {},
      leafWithEscapedArgParser.escapedArgParser!.getValue([]),
    ]);
  });
});
