import { option, leaf, cli, branch } from '..';
import { Option } from '../types';

jest.mock('@carnesen/run-and-exit');

describe('index', () => {
  it('exports an "option" factory function that returns the input', () => {
    const opt: Option<'boolean', true> = {
      typeName: 'boolean',
      description: 'a boolean option',
      defaultValue: false,
      nullable: true,
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

  it('exports a function "cli"', () => {
    expect(typeof cli).toBe('function');
  });
});
