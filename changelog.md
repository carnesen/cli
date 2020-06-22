# @carnesen/cli changelog

## Unreleased 0.5.0

### Breaking
Tweak the exported names to make the concepts easier to understand:
- "input" --> "arg parser" ("getValue" --> "parse")
- "ArgvInterface" --> "RunCli"
- "leaf" --> "command"

### Added
- Documentation via TSDoc and TypeDoc both in the dist directory of the package and on the web at [https://cli.carnesen.com](https://cli.carnesen.com).

### Changes
- Split off examples into a separate package `@carnesen/cli-examples` (source code still in this repo).

## 2020-05-15 0.4.0

### Breaking
Numerous tweaks to make the API more expressive and grepable, e.g. CliCommand instead of just Command. The docs are still a work-in-progress but the TypeScript types are spot-on. Let them be your guide!

### Added
When I went to work for alwaysAI I forked-by-copy-paste this project into [a new repo owned by the company](https://github.com/alwaysai/alwayscli). In retrospect I should have just fork-forked this repo to their namespace. But alas the Git history is broken so I copy-pasted those downstream changes back to this project. There we made numerous enhancements and solidified the API.
