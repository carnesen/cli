import { root } from '..';
import { testCli, testCliThrows } from '../../factories';

const example = testCli(root);

const catchExample = testCliThrows(root);

describe(`root command`, () => {
  it("runs the provided command's execute function if proper args are provided", async () => {
    const returnValue = await example('echo --message foo');
    expect(returnValue).toBe('foo');
  });

  it('throws a "Usage" string with root.commandName', async () => {
    const regExp = new RegExp(`^Usage: ${root.commandName} <subcommand>`);
    expect(await catchExample()).toMatch(regExp);
  });

  it('throws a "Usage" string for a subcommand tree if no sub-subcommand', async () => {
    const regExp = new RegExp(`^Usage: ${root.commandName} math <subcommand>`);
    expect(await catchExample('math')).toMatch(regExp);
  });

  it('throws a "Usage" string for a subcommand tree if sub-subcommand is help', async () => {
    const regExp = new RegExp(`^Usage: ${root.commandName} math <subcommand>`);
    expect(await catchExample('math help')).toMatch(regExp);
  });

  it('throws a "Usage" string but no "Error" if --help is passed to an otherwise ok command', async () => {
    const output = await catchExample('echo --message foo --help');
    expect(output).toMatch(/^Usage:/);
    expect(output).not.toMatch(/^Error:/m);
  });

  it('throws an "Usage" option string with default value if there is one', async () => {
    expect(await catchExample('cat --help')).toMatch('Default');
  });

  it('throws "Error" and "Usage" if required option is not passed', async () => {
    const ex = await catchExample('echo');
    expect(ex).toMatch(/^Error: Option "message" is required/m);
    expect(ex).toMatch(/^Usage/m);
  });

  it('boolean options default to false, can be enabled with --optionName', async () => {
    expect(await example('echo --message foo')).toBe('foo');
    expect(await example('echo --message foo --appendBar')).toBe('foobar');
  });

  it('properly handles options of type "number[]"', async () => {
    expect(await example('math multiply --numbers 1 2 3 4')).toBe(24);
  });

  it('properly handles options of type "json"', async () => {
    expect(await example(`get-foo --json {"foo":"baz"}`)).toBe('baz');
  });

  it('properly handles options of type "json" with default value', async () => {
    expect(await example(`get-foo`)).toBe('bar');
  });

  it('properly handles async actions', async () => {
    expect(await example(`cat --path ${__filename}`)).toMatch(
      'properly handles async actions',
    );
  });

  it('properly handles options of type "string[]"', async () => {
    expect(await example('concat --strings foo bar baz')).toBe('foobarbaz');
  });

  it('properly handles options of type "number"', async () => {
    expect(await example('math square --number 4')).toBe(16);
  });

  it('throws string "Option was provided twice" if option was provided twice', async () => {
    expect(await catchExample('math square --number 4 --number 3')).toMatch(
      'Option "number" was provided twice',
    );
  });

  it('throws string "Failed to parse" if json option parse fails', async () => {
    expect(await catchExample('get-foo --json boo')).toMatch('Failed to parse');
  });

  it('throws string "to be a json string" if json option string is not provided', async () => {
    expect(await catchExample('get-foo --json')).toMatch('to be a json string');
  });

  it('usage for a json option has its defaultValue JSON.stringified', async () => {
    expect(await catchExample('get-foo --help')).toMatch(`'{"foo":"bar"}'`);
  });

  it('throws string "Failed to parse" if json option parse fails', async () => {
    const caught = await catchExample('get-foo --help');
    expect(caught).toMatch('   [--json <json>] : An object with a foo property.');
    expect(caught).toMatch(
      '                   This is an example of a multi-line option description.',
    );
  });

  it('throws string "to be a single number" if number option has two values', async () => {
    expect(await catchExample('math square --number 3 4')).toMatch(
      'to be a single number',
    );
  });

  it('throws string "Could not convert ... to number" if number option has stringy value', async () => {
    expect(await catchExample('math square --number foo')).toMatch(
      `Could not convert "foo" to a number`,
    );
  });

  it('throws string "to be a single string" if string option has two values', async () => {
    expect(await catchExample('echo --message foo bar')).toMatch('to be a single string');
  });

  it('throws string "does not have subcommands" if there is an extra subcommand arg', async () => {
    expect(await catchExample('math square root')).toMatch(
      'Command "square" does not have subcommands',
    );
  });

  it('throws string "Bad command" if there is a unknown subcommand', async () => {
    expect(await catchExample('math squire')).toMatch('Error: Bad command "squire"');
  });

  it('throws string "Unknown option" if there is a unknown subcommand', async () => {
    expect(await catchExample('echo --message foo --carl')).toMatch(
      'Unknown option "--carl"',
    );
  });

  it('throws string "Expected ... to be one or more strings"', async () => {
    expect(await catchExample('concat --strings')).toMatch(
      /Expected .* one or more strings/,
    );
  });

  it('throws string "Expected ... to be one or more numbers"', async () => {
    expect(await catchExample('math multiply --numbers')).toMatch(
      /Expected .* one or more numbers/,
    );
  });

  it('throws if the action does', async () => {
    expect(await catchExample('throw --message foo')).toMatch('foo');
  });

  it('throws string "Boolean options have default "false"" if boolean has value', async () => {
    expect(await catchExample('echo --message foo --appendBar true')).toMatch(
      'Boolean options have default "false"',
    );
  });

  it('re-throws the full Error object if one is thrown in the action', async () => {
    const ex = await catchExample('fail --message foo --includeStack');
    expect(ex.stack).toMatch('src');
  });

  it('usage "is not allowed" if provided value is not one of allowedValues', async () => {
    const ex = await catchExample('echoFooOrBar --fooOrBar baz');
    expect(ex).toMatch('is not allowed');
  });

  it('throws "unexpected typeName" if an option has an invalid typeName', async () => {
    const ex = await catchExample('invalidTypeName');
    expect(ex.message).toMatch('unexpected typeName');
  });

  it('usage string contains allowedValues if there are any', async () => {
    const ex = await catchExample('echoFooOrBar --help');
    expect(ex).toMatch("Allowed values {'foo', 'bar'}");
  });

  it('does not throw if supplied value is one of allowedValues', async () => {
    expect(await example('echoFooOrBar --fooOrBar bar')).toBe('bar');
  });

  it('shows proper usage for typeName string[] with defaultValue', async () => {
    expect(await catchExample('echoWords --help')).toMatch(
      "Default = ['foo', 'bar', 'baz']",
    );
  });

  it('can use a defaultValue that is an array', async () => {
    expect(await example('echoWords')).toBe('foo bar baz');
  });

  it('throws usage if validate returns a truthy string', async () => {
    expect(await catchExample('absolute-cat --path foo')).toMatch('must be absolute');
  });

  it('does not throw usage if validate does not return a truthy string', async () => {
    expect(await example(`absolute-cat --path ${__filename}`)).toMatch(
      'does not throw usage',
    );
  });
});
