import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBranch } from './cli-branch';
import { CliCommand } from './cli-command';
import { dummyValuedParser } from './dummy-arg-parsers-for-testing';
import { Cli, ICliEnhancer } from './cli';
import { CLI_USAGE_ERROR } from './cli-usage-error';

const commandWithNamedValuedParsers = CliCommand({
  name: 'command-with-named-args',
  namedParsers: {
    foo: dummyValuedParser,
  },
  action(...args) {
    return args;
  },
});

const commandWithPositionalValuedParser = CliCommand({
  name: 'command-with-positional-args',
  positionalParser: dummyValuedParser,
  action(...args) {
    return args;
  },
});

const commandWithEscapedValuedParser = CliCommand({
  name: 'command-with-escaped-arg-parser',
  escapedParser: dummyValuedParser,
  action(...args) {
    return args;
  },
});

const root = CliBranch({
  name: 'cli',
  children: [
    commandWithPositionalValuedParser,
    commandWithNamedValuedParsers,
    commandWithEscapedValuedParser,
  ],
});

const cliArgRunner = Cli(root);

describe(Cli.name, () => {
  it('calls the enhancer if provided', async () => {
    const spy = jest.fn();
    const enhancer: ICliEnhancer = (innerArgRunner) => async (...args: string[]) => {
      spy(...args);
      await innerArgRunner(...args);
    };
    const enhancedArgRunner = Cli(commandWithPositionalValuedParser, {
      enhancer,
    });
    await enhancedArgRunner('foo', 'bar');
    expect(spy.mock.calls).toEqual([['foo', 'bar']]);
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

  it('throws USAGE error "positional arguments" if last command is a command without positionalValuedParser property and additional args is present', async () => {
    const exception = await runAndCatch(
      cliArgRunner,
      commandWithNamedValuedParsers.name,
      'oops',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch('Unexpected argument "oops"');
    expect(exception.message).toMatch(commandWithNamedValuedParsers.name);
    expect(exception.message).toMatch(/positional arguments/i);
    expect(exception.message).toMatchSnapshot();
  });

  it('Passes parsed positional value as first argument of the "action" function', async () => {
    const positionalArgs = ['foo', 'bar'];
    const result = await cliArgRunner(
      commandWithPositionalValuedParser.name,
      ...positionalArgs,
    );
    expect(result).toEqual([dummyValuedParser.parse(positionalArgs), {}, undefined]);
  });

  it('Passes parsed named values as second argument of the "action" function', async () => {
    const namedArgs = ['--foo', 'bar'];
    const result = await cliArgRunner(commandWithNamedValuedParsers.name, ...namedArgs);
    expect(result).toEqual([
      undefined,
      { foo: dummyValuedParser.parse(['bar']) },
      undefined,
    ]);
  });

  it(`Throws USAGE error 'does not allow "--"' if command does not have an "escaped" property`, async () => {
    const exception = await runAndCatch(
      cliArgRunner,
      commandWithPositionalValuedParser.name,
      '--',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(commandWithPositionalValuedParser.name);
    expect(exception.message).toMatch('does not allow "--"');
  });

  it('Passes parsed escaped value as third argument of the "action" function', async () => {
    const result = await cliArgRunner(commandWithEscapedValuedParser.name, '--');
    expect(result).toEqual([
      undefined,
      {},
      commandWithEscapedValuedParser.escapedParser!.parse([]),
    ]);
  });
});
