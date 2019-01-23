import { UsageError } from '@carnesen/usage-error';

import { Leaf, Branch } from './types';
import { callAction } from './call-action';
import { accumulateCommandStack } from './accumulate-command-stack';
import { accumulateArgv } from './accumulate-argv';
import { getUsageString } from './get-usage-string';

export function assembleCli(rootCommand: Branch | Leaf<any>) {
  return async (argv: string[]) => {
    const commandStack = [rootCommand];
    try {
      const { maybeCommandNames, rawNamedArgs, foundHelpArg } = accumulateArgv(argv);
      accumulateCommandStack(commandStack, maybeCommandNames);
      // ^^ This mutates commandStack so that we don't have to include it explicity
      // if accumulateCommandStack or the functions that it calls throws a UsageError.

      if (foundHelpArg) {
        throw getUsageString(commandStack);
      }

      return await callAction(commandStack, rawNamedArgs);
    } catch (ex) {
      if (ex && ex.code === UsageError.USAGE) {
        throw getUsageString(commandStack, ex.message);
      }
      throw ex;
    }
  };
}
