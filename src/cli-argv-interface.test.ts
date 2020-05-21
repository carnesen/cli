import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBranch } from './cli-branch';
import { CliLeaf } from './cli-leaf';
import { dummyArgParser } from './dummy-arg-parsers-for-testing';
import { CliArgvInterface, CliEnhancer } from './cli-argv-interface';
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

const argvInterface = CliArgvInterface(root);

describe(CliArgvInterface.name, () => {
  it('calls the enhancer if provided', async () => {
    const spy = jest.fn();
    const enhancer: CliEnhancer = (innerArgvInterface) => async (...argv: string[]) => {
      spy(...argv);
      await innerArgvInterface(...argv);
    };
    const enhancedArgvInterface = CliArgvInterface(leafWithPositionalArgParser, {
      enhancer,
    });
    await enhancedArgvInterface('foo', 'bar');
    expect(spy.mock.calls).toEqual([['foo', 'bar']]);
  });
  it('returns version string from package.json if "-v" or "--version" is passed', async () => {
    const version = await findVersion();
    expect(await argvInterface('-v')).toBe(version);
    expect(await argvInterface('--version')).toBe(version);
  });

  it('throws USAGE error with empty message if --help is passed', async () => {
    const exception = await runAndCatch(argvInterface, '--help');
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toBeFalsy();
  });

  it('throws USAGE error with empty message if last command is a branch and no additional argv is present', async () => {
    const exception = await runAndCatch(argvInterface);
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toBeFalsy();
  });

  it('throws USAGE error "bad command" if last command is a branch and additional argv is present', async () => {
    const exception = await runAndCatch(argvInterface, 'oops');
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(/bad command/i);
    expect(exception.message).toMatch('"oops"');
    expect(exception.message).toMatchSnapshot();
  });

  it('throws USAGE error "positional arguments" if last command is a leaf without positionalArgParser property and additional argv is present', async () => {
    const exception = await runAndCatch(
      argvInterface,
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
    const positionalArgv = ['foo', 'bar'];
    const result = await argvInterface(
      leafWithPositionalArgParser.name,
      ...positionalArgv,
    );
    expect(result).toEqual([dummyArgParser.getValue(positionalArgv), {}, undefined]);
  });

  it('Passes parsed named values as second argument of the "action" function', async () => {
    const namedArgv = ['--foo', 'bar'];
    const result = await argvInterface(leafWithNamedArgParsers.name, ...namedArgv);
    expect(result).toEqual([
      undefined,
      { foo: dummyArgParser.getValue(['bar']) },
      undefined,
    ]);
  });

  it(`Throws USAGE error 'does not allow "--"' if leaf does not have an "escaped" property`, async () => {
    const exception = await runAndCatch(
      argvInterface,
      leafWithPositionalArgParser.name,
      '--',
    );
    expect(exception.code).toBe(CLI_USAGE_ERROR);
    expect(exception.message).toMatch(leafWithPositionalArgParser.name);
    expect(exception.message).toMatch('does not allow "--"');
  });

  it('Passes parsed escaped value as third argument of the "action" function', async () => {
    const result = await argvInterface(leafWithEscapedArgParser.name, '--');
    expect(result).toEqual([
      undefined,
      {},
      leafWithEscapedArgParser.escapedArgParser!.getValue([]),
    ]);
  });
});
