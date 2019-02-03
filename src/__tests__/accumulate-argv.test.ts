import { accumulateArgv } from '../accumulate-argv';

describe(accumulateArgv.name, () => {
  it('accumulates as "maybeCommandNames" everything up to the first "--whatever"', () => {
    expect(accumulateArgv(['foo', 'bar', '--baz']).maybeCommandNames).toEqual([
      'foo',
      'bar',
    ]);
  });

  it('sets "foundHelpArg" to `true` if it encounters -h --h --help -help', () => {
    expect(accumulateArgv(['--help']).foundHelpArg).toBe(true);
    expect(accumulateArgv(['foo', '-help']).foundHelpArg).toBe(true);
    expect(accumulateArgv(['bar', '--baz', '-h']).foundHelpArg).toBe(true);
    expect(accumulateArgv(['--h']).foundHelpArg).toBe(true);
  });

  it('sets "foundHelpArg" to `true` if it encounters a maybeCommandName "help"', () => {
    expect(accumulateArgv(['help']).foundHelpArg).toBe(true);
  });

  it('sets "foundHelpArg" to `false` if it otherwise encounters a raw value "help"', () => {
    expect(accumulateArgv(['--foo help']).foundHelpArg).toBe(false);
  });

  it('sets "foundVersionArg" to `true` if it encounters -v --v --version -version', () => {
    expect(accumulateArgv(['--version']).foundVersionArg).toBe(true);
    expect(accumulateArgv(['foo', '-version']).foundVersionArg).toBe(true);
    expect(accumulateArgv(['bar', '--baz', '-v']).foundVersionArg).toBe(true);
    expect(accumulateArgv(['--v']).foundVersionArg).toBe(true);
  });

  it('otherwise sets "foundVersionArg" to `false`', () => {
    expect(accumulateArgv(['foo']).foundVersionArg).toBe(false);
  });
});
