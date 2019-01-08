import { option, leaf, cli, branch } from '..';
import { Option } from '../types';
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

  it('exports a "leaf" command factory function', () => {
    const returnValue = leaf({
      commandName: 'some command',
      action: () => {},
    });
    expect(returnValue.commandName).toBe('some command');
  });

  it('exports a "branch" command factory function', () => {
    const returnValue = branch({
      commandName: 'some command',
      subcommands: [],
    });
    expect(returnValue.commandName).toBe('some command');
  });

  it('exports a function "cli" that invokes "buildCli" then calls "runAndExit"', () => {
    cli(rootCommand);
  });
});
