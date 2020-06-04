import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBranch } from './cli-branch';
import { CliCommand } from './cli-command';
import { dummyArgParser } from './dummy-arg-parsers-for-testing';
import { RunCli, CliEnhancer } from './run-cli';
import { findVersion } from './find-version';
import { CLI_USAGE_ERROR } from './cli-usage-error';

const commandWithNamedArgParsers = CliCommand({
  name: 'command-with-named-args',
  namedArgParsers: {
    foo: dummyArgParser,
  },
  action(...args) {
    return args;
  },
});

const commandWithPositionalArgParser = CliCommand({
  name: 'command-with-positional-args',
  positionalArgParser: dummyArgParser,
  action(...args) {
    return args;
  },
});

const commandWithEscapedArgParser = CliCommand({
  name: 'command-with-escaped-arg-parser',
  escapedArgParser: dummyArgParser,
  action(...args) {
    return args;
  },
});

const root = CliBranch({
  name: 'cli',
  children: [
    commandWithPositionalArgParser,
    commandWithNamedArgParsers,
    commandWithEscapedArgParser,
  ],
});

const cliArgRunner = RunCli(root);

describe(RunCli.name, () => {
  it('calls the enhancer if provided', async () => {
    const spy = jest.fn();
    const enhancer: CliEnhancer = (innerArgRunner) => async (...args: string[]) => {
      spy(...args);
      await innerArgRunner(...args);
    };
    const enhancedArgRunner = RunCli(commandWithPositionalArgParser, {
      enhancer,
    });
    await enhancedArgRunner('foo', 'bar');
    expect(spy.mock.calls).toEqual([['foo', 'bar']]);
  });

  it('returns version string from package.json if "--version" is passed', async () => {
    const version = await findVersion();
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

  it('throws USAGE error "positional arguments" if last command is a command without positionalArgParser property and additional args is present', async () => {
    const exception = await runAndCatch(
      cliArgRunner,
      commandWithNamedArgParsers.name,
      'oops',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch('Unexpected argument "oops"');
    expect(exception.message).toMatch(commandWithNamedArgParsers.name);
    expect(exception.message).toMatch(/positional arguments/i);
    expect(exception.message).toMatchSnapshot();
  });

  it('Passes parsed positional value as first argument of the "action" function', async () => {
    const positionalArgs = ['foo', 'bar'];
    const result = await cliArgRunner(
      commandWithPositionalArgParser.name,
      ...positionalArgs,
    );
    expect(result).toEqual([dummyArgParser.parse(positionalArgs), {}, undefined]);
  });

  it('Passes parsed named values as second argument of the "action" function', async () => {
    const namedArgs = ['--foo', 'bar'];
    const result = await cliArgRunner(commandWithNamedArgParsers.name, ...namedArgs);
    expect(result).toEqual([
      undefined,
      { foo: dummyArgParser.parse(['bar']) },
      undefined,
    ]);
  });

  it(`Throws USAGE error 'does not allow "--"' if command does not have an "escaped" property`, async () => {
    const exception = await runAndCatch(
      cliArgRunner,
      commandWithPositionalArgParser.name,
      '--',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(commandWithPositionalArgParser.name);
    expect(exception.message).toMatch('does not allow "--"');
  });

  it('Passes parsed escaped value as third argument of the "action" function', async () => {
    const result = await cliArgRunner(commandWithEscapedArgParser.name, '--');
    expect(result).toEqual([
      undefined,
      {},
      commandWithEscapedArgParser.escapedArgParser!.parse([]),
    ]);
  });
});
