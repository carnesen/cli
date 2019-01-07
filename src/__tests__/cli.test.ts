import { buildCli } from '../build-cli';
import { rootCommand } from '../example';

const exampleAsyncFunc = buildCli(rootCommand);

const example = (str?: string) => {
  const argv = str ? str.split(' ') : [];
  return exampleAsyncFunc(argv);
};

const catchExample = async (str?: string) => {
  try {
    await example(str);
    throw Symbol();
    // ^^ This line is never meant to be reached
  } catch (ex) {
    return ex;
  }
};

describe(`async function returned by ${buildCli.name}`, () => {
  it("runs the provided command's execute function if proper args are provided", async () => {
    const returnValue = await example('echo --message foo');
    expect(returnValue).toBe('foo');
  });

  it('throws a "Usage" string with rootCommand.commandName', async () => {
    const regExp = new RegExp(`^Usage: ${rootCommand.commandName} <subcommand>`);
    expect(await catchExample()).toMatch(regExp);
  });

  it('throws a "Usage" string for a subcommand tree if no sub-subcommand', async () => {
    const regExp = new RegExp(`^Usage: ${rootCommand.commandName} math <subcommand>`);
    expect(await catchExample('math')).toMatch(regExp);
  });

  it('throws a "Usage" string for a subcommand tree if sub-subcommand is help', async () => {
    const regExp = new RegExp(`^Usage: ${rootCommand.commandName} math <subcommand>`);
    expect(await catchExample('math help')).toMatch(regExp);
  });

  it('throws a "Usage" string if --help is passed to an otherwise ok command', async () => {
    expect(await catchExample('echo --message foo --help')).toMatch(/^Usage:/);
  });

  it('throws "Error" and "Usage" if required option is not passed', async () => {
    const ex = await catchExample('echo');
    expect(ex).toMatch(/^Error: option "message" is required/);
    expect(ex).toMatch(/^Usage/m);
  });

  it('boolean options default to false, can be enabled with --option-name', async () => {
    expect(await example('echo --message foo')).toBe('foo');
    expect(await example('echo --message foo --append-bar')).toBe('foobar');
  });

  it('properly handles options of type "number[]"', async () => {
    expect(await example('math multiply --numbers 1 2 3 4')).toBe(24);
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
    expect(await catchExample('echo --message foo --append-bar true')).toMatch(
      'Boolean options have default "false"',
    );
  });

  it('re-throws the full Error object if one is thrown in the action', async () => {
    const ex = await catchExample('throw --message foo --include-stack');
    expect(ex.stack).toMatch('src/example.ts');
  });
});
