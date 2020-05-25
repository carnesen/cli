export type NamedArgs = {
  [argName: string]: string[] | undefined;
};

const DASH_DASH = '--';
const HELP_ARGS = ['--help', '-h', 'help'];

type AccumulatedArgs = {
  commandNamesAndPositionalArgs: string[];
  escapedArgs: string[] | undefined;
  foundHelp: boolean;
  namedArgs: NamedArgs;
};

export function accumulateArgs(args: string[]): AccumulatedArgs {
  const commandNamesAndPositionalArgs: string[] = [];
  const namedArgs: NamedArgs = {};
  let escapedArgs: string[] | undefined;
  let foundHelp = false;
  let currentArgs = commandNamesAndPositionalArgs;
  for (let i = 0; i < args.length; i += 1) {
    const str = args[i];

    if (HELP_ARGS.includes(str)) {
      foundHelp = true;
      continue;
    }

    if (str === DASH_DASH) {
      escapedArgs = args.slice(i + 1);
      break;
    }

    if (str.startsWith(DASH_DASH)) {
      const name = str.slice(DASH_DASH.length).trim();
      const existingArgs = namedArgs[name];
      if (existingArgs) {
        // Allow user to supply multi-valued args as, e.g.
        // --foo bar --foo baz
        // is equivalent to
        // --foo bar baz
        currentArgs = existingArgs;
      } else {
        currentArgs = [];
        namedArgs[name] = currentArgs;
      }
      continue;
    }

    // This str is not "--"
    // nor have we hit "--"
    // nor is this str "--something"
    currentArgs.push(str);
  }

  return {
    foundHelp,
    commandNamesAndPositionalArgs,
    namedArgs,
    escapedArgs,
  };
}
