# @carnesen/cli-examples changelog

## 0.5.0 - Unreleased
This initial release implements examples of using `@carnesen/cli` to build command-line interfaces. The purpose of this package is primarily documentary, but it also serves as a test suite from the end user's perspective. Among other things it helps verify the packaging process. This package is [universal JavaScript](https://en.wikipedia.org/wiki/Universal_JavaScript) except the `src/cli.ts` entrypoint, this package's ["bin" executable](https://docs.npmjs.com/files/package.json#bin).

The initial top-level example commands are:
- **echo**: Prints the provided arguments to the terminal
- **multiply**: Multiply numbers and print the result
- **throw-error**: Throw an error to see how they're displayed

And underneath an "advanced" branch:
- **ansi-echo**: Print to the terminal with ANSI decoration
- **demo-double-dash-arguments**: Demonstrate usage of double-dash arguments
- **hiding echo-pizza**: Same as echo but with a hidden flag --pizza
- **hiding normal-branch echo**: Prints the provided arguments to the terminal
- **hiding echo-hidden**: Same as echo but with hidden=true
- **hiding hidden-branch echo**: Same as echo but within a hidden branch
- **parse-json**: Parse JSON and print the result
