import { Leaf, Branch } from './types';
import { createCallAction } from './create-call-action';
import { accumulateCommandStack } from './accumulate-command-stack';
import { accumulateArgv } from './accumulate-argv';
import { getUsageString } from './get-usage-string';

export function assembleCli(rootCommand: Branch | Leaf<any>) {
  return async (argv: string[]) => {
    const commandStack = [rootCommand];
    try {
      const { maybeCommandNames, rawNamedArgs } = accumulateArgv(argv);
      const versionArgs = rawNamedArgs['version'];
      if (versionArgs) {
        if (versionArgs.length === 0) {
          return rootCommand.version || '"version" has not been set for this package';
        }
      }

      let foundHelp = false;
      let slicedCommandNames = maybeCommandNames;
      for (const h of ['help', '-h', 'h']) {
        const indexOfH = maybeCommandNames.indexOf(h);
        if (indexOfH > -1) {
          foundHelp = true;
          slicedCommandNames = slicedCommandNames.slice(0, indexOfH);
        }
      }
      if (rawNamedArgs['help']) {
        foundHelp = true;
      }
      accumulateCommandStack(commandStack, slicedCommandNames);
      // ^^ This mutates commandStack so that we don't have to include it explicity
      // if accumulateCommandStack or the functions that it calls throws a UsageError.

      if (foundHelp) {
        throw getUsageString(commandStack);
      }

      const callAction = createCallAction(commandStack, rawNamedArgs);
      return await callAction();
    } catch (ex) {
      if (ex && ex.code === 'USAGE') {
        throw getUsageString(commandStack, ex.message);
      }
      throw ex;
    }
  };
}
