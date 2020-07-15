## Structure
The general structure of a `@carnesen/cli` command line is:
```
<branch> <command> <positional-args> --name <args> -- <double-dash-args>
```
Only `<command>` is required. This section of the documentation describes each of these components in more detail. In the code snippets that follow we omit `description`s for brevity.

### Branch
Branches provide a way of organizing commands as a tree for a CLI. For example, in `cloud-cli users list`, `cloud-cli` and `users` are [[`ICliBranch`]] parents of the [[`ICliCommand`]] `list`. Branches are optional. The "root" of your command tree could be a command like `list-cloud-users`, or maybe you prefer a single root branch with a list of commands underneath like `cloud-cli list-users`.

### Command
An [[`ICliCommand`]]s defines an `action` function and the arguments that a user can provide for it. In `cloud-cli users list`, for example, the command is `list`. It might not have any arguments in which case its definition might be as simple as:
```typescript
import { CliCommand } from '@carnesen/cli';

export const listCommand = CliCommand({
   name: 'list',
   async action() {
      // Fetch the users and return an array of their usernames
   }
})
```
The command can define arguments through the `positionalArgGroup`, `namedArgGroups`, and `doubleDashArgGroup` properties as described below.

### Positional arguments
An [[`ICliCommand`]]'s `positionalArgGroup` receives all the command-line arguments after the command name but before the first argument that starts with `--` e.g. `carl` and `karen` in `cloud-cli users delete carl karen --force`. The parsed command-line values are passed into your command's `action` as the first argument:
```typescript
import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

export const deleteCommand = CliCommand({
   name: 'delete',
   positionalArgGroup: CliStringArrayArgGroup({ required: true }),
   async action(usernames) {
      // Here usernames is an array of strings e.g. ["carl", "karen"]
      // Delete the users ...
   }
})
```
The [[`CliStringArrayArgGroup`]] parser returns the argument strings if the user provides one or more arguments or throws a [[`CliUsageError`]] if no argument is provided since we set `required` to `true`.
### Named arguments
An [[`ICliCommand`]]'s `namedArgGroups` receive all the command-line arguments of the form `--name value`. The parsed values are passed into the command's `action` as its second argument. Building on the `cloud-cli users list` example above, let's provide a flag to limit the list to only active users:
```typescript
import { CliCommand, CliBooleanArgGroup } from '@carnesen/cli';

export const listCommand = CliCommand({
   name: 'list',
   namedArgGroups: {
      active: CliBooleanArgGroup(),
   },
   async action(_, { active }) {
      // This command does not define a positionalArgGroup. So name
      // the first function argument "_" to signify it's unused.
      // Fetch the users and return an array of their usernames ...
   }
})
```
The [[`CliBooleanArgGroup`]] parser return `false` unless the user passes `--active` in which case it returns `true`.

### Dash-dash arguments
All command-line arguments after a lone `--` are passed to the [[`ICliCommand`]]'s `doubleDashArgGroup` whose parsed value is passed as the third argument to your command's `action` function. After `--`, things like `--name` aren't interpreted as argument group separators. This is particularly useful for passing arguments through to another CLI like `do -- git --version`:

```typescript
import { CliCommand, CliStringArrayArgGroup } from '@carnesen/cli';

export const doCommand = CliCommand({
   name: 'do',
   dashDashArgGroup: CliStringArrayArgGroup(),
   async action(_, __, args) {
      // This command does not define a positionalArgGroup. So name
      // the first function argument "_" to signify it's unused.
      // Same for the second argument, since there's no namedArgGroups.
      // Do stuff with the args ...
   }
})
```
