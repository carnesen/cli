import { runAndExit } from '@carnesen/run-and-exit';
import { Command, CommandStack } from './types';
import { accumulateSteps } from './accumulate-steps';
import { accumulateCommandStack } from './accumulate-command-stack';
import { accumulateArgv } from './accumulate-argv';
import { USAGE } from './util';
import { getUsageString } from './get-usage-string';

export function cli(rootCommand: Command<any>, argv = process.argv.slice(2)) {
  runAndExit(async () => {
    const commandStack: CommandStack = [rootCommand];
    try {
      const { maybeCommandNames, rawNamedArgs, foundHelpArg } = accumulateArgv(argv);
      accumulateCommandStack(commandStack, maybeCommandNames);
      // ^^ This mutates commandStack
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
  });
}
