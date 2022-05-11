# **@carnesen/cli** changelog

## Upcoming

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
