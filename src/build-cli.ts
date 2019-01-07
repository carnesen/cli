import { Command, CommandStack } from './types';
import { accumulateSteps } from './accumulate-steps';
import { accumulateCommandStack } from './accumulate-command-stack';
import { accumulateArgv } from './accumulate-argv';
import { USAGE } from './usage-error';
import { getUsageString } from './get-usage-string';

export function buildCli(rootCommand: Command<any>) {
  return async (argv: string[]) => {
    const commandStack: CommandStack = [rootCommand];
    try {
      const { maybeCommandNames, rawNamedArgs, foundHelpArg } = accumulateArgv(argv);
      accumulateCommandStack(commandStack, maybeCommandNames);
      // ^^ This mutates commandStack so that we don't have to include it explicity
      // if accumulateCommandStack or the functions that it calls throws a UsageError.
      if (foundHelpArg) {
        throw getUsageString(commandStack);
      }
      const steps = accumulateSteps(commandStack, rawNamedArgs);
      let returnValue: any;
      for (const step of steps) {
        returnValue = await step();
      }
      return returnValue;
    } catch (ex) {
      if (ex.code === USAGE) {
        throw getUsageString(commandStack, ex.message);
      }
      throw ex;
    }
  };
}
