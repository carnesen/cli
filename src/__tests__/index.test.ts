import { option, command, cli } from '..';
import { Option, Command, Options } from '../types';
import { rootCommand } from '../example';

jest.mock('@carnesen/run-and-exit');

describe('index', () => {
  it('exports an "option" factory function that returns the input', () => {
    const opt: Option<'boolean'> = {
      typeName: 'boolean',
      description: 'a boolean option',
      defaultValue: false,
    };
    const returnValue = option(opt);
    expect(returnValue).toBe(opt);
  });

  it('exports a "command" factory function that returns the input', () => {
    const cmd: Command<{}> = {
      commandName: 'some command',
    };
    const returnValue = command(cmd);
    expect(returnValue).toBe(cmd);
  });

  it('exports a function "cli" that invokes "buildCli" then calls "runAndExit"', () => {
    cli(rootCommand);
  });
});
