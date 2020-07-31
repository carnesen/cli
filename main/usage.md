## Usage

Install this library using `npm`:

```plaintext
npm install @carnesen/cli
```

Here is a TypeScript Node.js CLI that does some basic arithmetic:

```typescript
// src/multiply.ts
import {
   Cli,
   CliCommand,
   CliNumberArrayArgGroup,
} from '@carnesen/cli';

const multiplyCommand = CliCommand({
   name: 'multiply',
   description: 'Multiply numbers and print the result',
   positionalArgGroup: CliNumberArrayArgGroup({
      required: true,
   }),
   action({ positionalValue: numbers }) {
      return numbers.reduce((a, b) => a * b, 1);
   },
});

// Export for unit testing
export const cli = Cli(multiplyCommand);

// If this module is the entrypoint for this Node.js process
if (require.main === module) {
   cli.run();
}
```

Here's how that Node.js CLI behaves in a terminal:
<p><img width="400" src="images/multiply-nodejs.jpg" alt="Multiple CLI in Node.js"></p>

The only Node.js-specific code is the `if (require.main === module)` block. To instead make a web browser console CLI, replace that with:

```typescript
(window as any).multiply = (line: string) => {
	cli.runLine(line);
};
```

Here's how that behaves as a web browser console CLI:
<p><img width="400" src="images/multiply-browser-console.jpg" alt="Multiple CLI in browser console"></p>

Like an exit code in a shell, the resolved value of `0` means the command finished successfully. Anything else is an error code. Try it you yourself at [cli.carnesen.com](https://cli.carnesen.com)! Here's how to open the console in [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Google Chrome](https://stackoverflow.com/a/66434/2793540).

## Structure

The general structure of a `@carnesen/cli` command line is:
```
<branch> <command> <positional-args> --name <args> -- <double-dash-args>
```
Only `<command>` is required. This section of the documentation describes each of these pieces in more detail. In the code snippets that follow we omit `description`s for brevity.

### Command

A command defines an action `function` or `async function` and its command-line arguments. In `cloud users list`, for example, the command is `list`. Some commands don't have any arguments:

```typescript
import { CliCommand } from '@carnesen/cli';

export const listUsersCommand = CliCommand({
   name: 'list',
   async action() {
      // Fetch all users and return an array of usernames
   }
})
```
[[`CliCommand`]] is a factory function (not a constructor) that returns an object literal of shape [[`ICliCommand`]].

Most commands define arguments through the `positionalArgGroup`, `namedArgGroups`, and/or `doubleDashArgGroup` as described below.

### Branch

Branches provide a way of organizing commands as a tree for a CLI. For example, in `cloud users list`, `cloud` and `users` are branches and `list` is a subcommand. Branches are optional. Organize your CLI to suit your needs and taste:

- `list-cloud-users`: No branches
- `cloud list-users`: A single root branch with a bunch of commands underneath: 
- `cloud users list`: A hierarchical command tree

```typescript
import { CliBranch } from '@carnesen/cli';
import { listUsersCommand } from './list-users-command';

export const usersBranch = CliBranch({
   name: 'users',
   subcommands: [ listUsersCommand ]
})

export const rootBranch = CliBranch({
   name: 'cloud',
   subcommands: [ usersBranch ]
})
```

[[`CliBranch`]] is a factory function (not a constructor) that returns an object literal of shape [[`ICliBranch`]].

### Positional arguments

A command's `positionalArgGroup` receives all the command-line arguments after the command name but before the first argument that starts with `--`. For example in `cloud users delete carl karen --force`, the positional arguments are `carl` and `karen`. The argument group provides a well-typed value as the `positionalValue` property:

```typescript
import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

export const deleteCommand = CliCommand({
   name: 'delete',
   positionalArgGroup: CliStringArrayArgGroup({ required: true }),
   async action({ positionalValue: usernames }) {
      // The CliStringArrayArgGroup parser returns an array of strings e.g.
      //   ["carl", "karen"]
      // Delete the users ...
   }
})
```

The [[`CliStringArrayArgGroup`]] parser throws a [[`CliUsageError`]] when `required` is set to `true` and no argument is provided. If `required` is _not_ set and no argument is provided, the `action` receives a value `undefined`. This distinction is captured by the types too, i.e. `usernames` would have type `string[] | undefined` instead of `string[]` if we hadn't set `required` to `true`.

### Named arguments

A command's `namedArgGroups` receives all the command-line arguments of the form `--name value`. The values are passed into the command's action as `namedValues` of shape `{ name: <value>, ... }`. Building on `cloud users list` from above, let's define a command-line flag to limit the list to only active users:

```typescript
import { CliCommand, CliFlagArgGroup } from '@carnesen/cli';

export const listCommand = CliCommand({
   name: 'list',
   namedArgGroups: {
      active: CliFlagArgGroup(),
   },
   async action({ namedValues: { active } }) {
      // This command does not define a positionalArgGroup. So name
      // the first function parameter "_" to signify it's unused.

      // The CliFlagArgGroup parser returns false unless the user 
      // passes --active in which case it returns true.

      // Fetch the users and return an array of their usernames ...
   }
})
```

### Double-dash arguments

All command-line arguments after a lone `--` are passed to the command's `doubleDashArgGroup` which provides the `doubleDashValue` property. After the lone `--`, things like `--name` aren't interpreted as argument group separators. This is particularly useful for passing arguments through to another CLI like `do -- git --version`:

```typescript
import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

export const doCommand = CliCommand({
   name: 'do',
   doubleDashArgGroup: CliStringArrayArgGroup(),
   async action({ doubleDashValue: args }) {
      // Do stuff with the args ...
   }
})
```

[Go back to top](#)
