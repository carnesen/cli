# **@carnesen/cli** changelog

## Upcoming

This is a significant release though most of the changes are internal. We refactor all the **@carnesen/cli** abstractions as `class`-based implementations. Earlier implementations of this library favored a pattern of factory functions producing a plain object. We branded these new abstractions using a new namespace/branding convention `CCli`, a shortening of **@carnesen/cli**, instead of simply `Cli`. This was done partly just to make the names more distinctive and consistent with the new `c` namespace object described below, but also it facilitates backwards compatibility. For example, the `CliCommand` name was previously exported as an ordinary function returning a plain object. In this release we refactor that feature as a `class` `CCliCommand` preserving backward compatibility by exporting `CliCommand` as a reference to the `CCliCommand.create` static method.


### Features

The 

### Deprecations

### Breaking changes

In practice in the typical use cases, none of these changes should be breaking ones. Some of them may apply if you're using advanced **@carnesen/cli** features or relying on implementation details.

- `Cli` properties: The options (`description` etc) passed into the factory are no longer merged into the resulting object as top-level properties.

- Type re-naming: Previously this package exported types using a naming convention where type aliases were prefixed with `T` (e.g. `TCliDescriptionFunction`) and interfaces were prefixed with `I` (e.g. `ICliCommand`). Since then the authors have realized that there's not a substantive difference between interfaces and type aliases so it's kinda silly to factor in that distinction so prominently in the naming convention. We've also since embraced use of `class`es preferentially over plain-object types and factories. All the types exported by this package have been renamed. This is only a breaking change if you were explicitly importing the types, which wouldn't typically be the case. The simplest way to know whether you're affected by this change would be to upgrade to the new release and run you TypeScript compile step. It will identify any places where you're using a type that no longer exists. In most cases the new type will have the same name as the old type but without the `T` or `I` prefix and with `CCli` in place of `Cli`. For example `ICliCommand` --> `CCliCommand`.

- Custom argument group types: Previously one could define a new custom argument group type by implementing the `ICliArgGroup` interface. In the new architecture, a custom argument group type is implemented by extending `CCliAbstractArgGroup`. For examples, see the built-in argument group types e.g. `CCliStringArgGroup`.



## carnesen-cli-0.7.1 (2022-05-10)

- Breaking: Drop official support for Node.js 12

- Internal: Run the TypeScript compiler explicitly avoiding @types/node to make sure this code is truly isomorphic

- Fix: A browser-only bug where CliRun made an unqualified reference to `process`

- Internal: Upgrade dev dependencies

## carnesen-cli-0.6.0 (2022-02-26)

- Fix: CliStringChoicesArgGroup factory should allow readonly string array choices [#193](https://github.com/carnesen/cli/issues/193)

- Internal: Update dependencies. Use @carnesen/dev to release.

## 0.5.1 - 2020-02-06

### Fixes

- Unexpected handling of exception with numeric "code" property (https://github.com/carnesen/cli/issues/166)

## 0.5.0 - 2020-09-12

### Breaking

We completely overhauled the API in this release with the goal of making it as easy as possible to understand and use, but also with an eye on achieving 100% backwards compatibility by 1.0.

A user of v0.3 would scarcely recognize this library's public API, but they'd be in luck because now it's 100% documented both in the source code and online. If you were an early adopter of **@carnesen/cli**, thank you! We'd be happy to help you upgrade to 0.5, just [file an issue on this project's repository on GitHub](https://github.com/carnesen/cli/issues/new) asking for assistance.

### Features

- Browser compatibility: We've removed all runtime dependencies on third-party packages and Node.js-specific global variables like `process`, nor do we depend on `@types/node` (except internally for unit tests) nor the `DOM` TypeScript lib.
- API docs built from source using TypeDoc, published as the npm package `@carnesen/cli-docs` and on the web at [https://cli.carnesen.com/docs](https://cli.carnesen.com/docs)
- Fold the argument/branch/command description text to fit the user's terminal in command-line usage
- Built-in ANSI text decoration in `description` and `action`

### Other

- Split out the examples into a separate top-level sub-directory `examples` in the `carnesen/cli` monorepo and publish as separate package `@carnesen/cli-examples`.

## 0.4.0 - 2020-05-15

### Breaking
Numerous tweaks to make the API more expressive and grepable, e.g. CliCommand instead of just Command. The docs are still a work-in-progress but the TypeScript types are spot-on. Let them be your guide!

### Added
When I went to work for alwaysAI I forked-by-copy-paste this project into [a new repo owned by the company](https://github.com/alwaysai/alwayscli). In retrospect I should have just fork-forked this repo to their namespace. But alas the Git history is broken so I copy-pasted those downstream changes back to this project. There we made numerous enhancements and solidified the API.
