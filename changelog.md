# @carnesen/cli change log

## [Unreleased]
### Breaking
Refactor:
- "input" --> "arg parser" 
- "getValue" --> "parse"
## 0.4.0
### Breaking
Numerous tweaks to make the API more expressive and grepable, e.g. CliLeaf instead of just Leaf. The docs are still a work-in-progress but the TypeScript types are spot-on. Let them be your guide!
### Added
When I went to work for alwaysAI I forked-by-copy-paste this project into [a new repo owned by the company](https://github.com/alwaysai/alwayscli). In retrospect I should have just fork-forked this repo to their namespace. But alas the Git history is broken so I copy-pasted those downstream changes back to this project. There we made numerous enhancements and solidified the API.
