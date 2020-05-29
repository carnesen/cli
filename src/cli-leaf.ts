/* eslint-disable no-redeclare */
import {
  AnyNamedArgParsers,
  CliLeaf,
  ExcludeCommandType,
  AnyArgParser,
  CliArgParser,
} from './types';
import { CLI_LEAF } from './constants';

/**
 * 
 * A factory for creating "action" commands. Returns the newly-created `leaf`.

#### name
If this "leaf" is a subcommand, `name` is the string that the user will pass as the "subcommand" argument to invoke this action. If this "leaf" is the root command, `name` should be the CLI's name.

#### description
(Optional) A string that will be included in `Usage:` if present.

#### positionalArgParser
(Optional) An `ArgParser` for 

#### namedArgParsers
(Optional) An object of named `ArgParser`s, for example:
```ts
const options = {
  path: createStringArgParser({
    description: 'An absolute or relative path',
  }),
}
```
The `args` and `options` properties define how the command-line arguments get parsed and transformed before being passed into the `action` function.

#### action(args, options)
The function that defines your command logic. `action` can return a value synchronously like in the "multiply" example above, or it can be an `async` function that returns a `Promise`. If `action` returns/resolves a value, that value is `console.log`ged before the CLI exits. If `action` throws/rejects, the exception is `console.log`ged before the CLI exits. That means that if you don't want the user to see a stack trace, your `action` should throw a `string` instead of an `Error` object. The type of the `args` argument received by `action` is derived by the `args` property of the leaf. Similarly, the `options` argument type is derived from `leaf.options`.

#### hidden
(Optional) `boolean`

#### version
(Optional) `string`. If provided, this string will be printed when the user does `cli --version` or `cli -v`. If this value is not provided, `@carnesen/cli` will attempt to find a version string in your package.json file.

 */

export function CliLeaf<
  TPositional extends AnyArgParser = CliArgParser<undefined, false>,
  TNamed extends AnyNamedArgParsers = any,
  TEscaped extends AnyArgParser = CliArgParser<undefined, false>
>(
  config: ExcludeCommandType<CliLeaf<TPositional, TNamed, TEscaped>>,
): CliLeaf<TPositional, TNamed, TEscaped> {
  const cliLeaf: CliLeaf<TPositional, TNamed, TEscaped> = {
    ...config,
    commandType: CLI_LEAF,
  };
  return cliLeaf;
}
