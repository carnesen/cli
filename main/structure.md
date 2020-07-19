## Structure
The general structure of a `@carnesen/cli` command line is:
```
<branch> <command> <positional-args> --name <args> -- <double-dash-args>
```
Only `<command>` is required. This section of the documentation describes each of these pieces in more detail. In the code snippets that follow we omit `description`s for brevity.

### Branch
Branches provide a way of organizing commands as a tree for a CLI. For example, in `cloud-cli users list`, `cloud-cli` and `users` are [[`ICliBranch`]] parents of the [[`ICliCommand`]] `list`. Branches are optional. The "root" of your command tree could be a command like `list-cloud-users`, or maybe you prefer a single root branch with a list of commands underneath like `cloud-cli list-users`.

### Command
An [[`ICliCommand`]]s defines an `action` `function` or `async function` and the parameters that an end user can provide to it via command-line arguments. In `cloud-cli users list`, for example, the command is `list`. A command need not have arguments:
```typescript
import { CliCommand } from '@carnesen/cli';

export const listCommand = CliCommand({
   name: 'list',
   async action() {
      // Fetch all users and return an array of usernames
   }
})
```
but most do define arguments through the `positionalArgGroup`, `namedArgGroups`, and `doubleDashArgGroup` properties as described below.

### Positional arguments
An [[`ICliCommand`]]'s `positionalArgGroup` receives all the command-line arguments after the command name but before the first argument that starts with `--` e.g. `carl` and `karen` in `cloud-cli users delete carl karen --force`. The parsed command-line values are passed into your command's `action` as the first function parameter:
```typescript
import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

export const deleteCommand = CliCommand({
   name: 'delete',
   positionalArgGroup: CliStringArrayArgGroup({ required: true }),
   async action(usernames) {
      // The CliStringArrayArgGroup parser returns an array of strings e.g.
      //   ["carl", "karen"]
      // Delete the users ...
   }
})
```
The [[`CliStringArrayArgGroup`]] parser throws a [[`CliUsageError`]] when `required` is set to `true` and no argument is provided. If `required` is not set and no argument is provided, the `action` receives `undefined`. This distinction is captured by the types too, i.e. `usernames` would have type `string[] | undefined` instead of `string[]` if we hadn't set `required` to `true`.

### Named arguments
An [[`ICliCommand`]]'s `namedArgGroups` receive all the command-line arguments of the form `--name value`. The parsed values are passed into the command's `action` as the second function parameter as an object of the form `{ name: parsedValue, ... }`. For example, building on `cloud-cli users list` from above, let's provide a command-line flag to limit the list to only active users:
```typescript
import { CliCommand, CliBooleanArgGroup } from '@carnesen/cli';

export const listCommand = CliCommand({
   name: 'list',
   namedArgGroups: {
      active: CliBooleanArgGroup(),
   },
   async action(_, { active }) {
      // This command does not define a positionalArgGroup. So name
      // the first function parameter "_" to signify it's unused.

      // The CliBooleanArgGroup parser returns false unless the user 
      // passes --active in which case it returns true.

      // Fetch the users and return an array of their usernames ...
   }
})
```

### Double-dash arguments
All command-line arguments after a lone `--` are passed to the [[`ICliCommand`]]'s `doubleDashArgGroup` whose parsed value is passed as the third parameter to your command's `action` function. After `--`, things like `--name` aren't interpreted as argument group separators. This is particularly useful for passing arguments through to another CLI like `do -- git --version`:

```typescript
import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

export const doCommand = CliCommand({
   name: 'do',
   dashDashArgGroup: CliStringArrayArgGroup(),
   async action(_, __, args) {
      // This command does not define a positionalArgGroup. So name
      // the first function parameter "_" to signify it's unused.
      // Same for the second parameter, since there's no namedArgGroups.

      // Do stuff with the args ...
   }
})
```
