import { runAndExit } from '@carnesen/run-and-exit';
import { Command } from './types';
import { createSteps } from './create-steps';
import { accumulateCommands } from './accumulate-commands';
import { accumulateArgv } from './accumulate-argv';

export function runCommand(rootCommand: Command<any>, argv = process.argv.slice(2)) {
  runAndExit(async () => {
    const { maybeCommandNames, rawNamedArgs } = accumulateArgv(argv);
    const commands = accumulateCommands(rootCommand, maybeCommandNames);
    const steps = createSteps(commands, rawNamedArgs);
    const returnValues: any[] = [];
    for (const step of steps) {
      const returnValue = await step();
      returnValues.push(returnValue);
    }
    return returnValues.slice(-1)[0];
  });
}
