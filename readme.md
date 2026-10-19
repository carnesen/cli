# @carnesen/cli

A command-line interface (CLI) framework for Node.js and web browser

[![build status badge](https://github.com/carnesen/ccli/actions/workflows/test.yml/badge.svg)](https://github.com/carnesen/ccli/actions/workflows/test.yml) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/cli) [![github stars badge](https://img.shields.io/github/stars/carnesen/ccli)](https://github.com/carnesen/ccli)

The **@carnesen/cli** package includes runtime JavaScript files (ES2019 +
CommonJS) and TypeScript type declarations (3.7+). It has _no_ npm dependencies
and is known to work with Node.js 14+ and all modern web browsers.

## Features

- **Easy to use**: We ❤️ CLIs and want to use them everywhere for everything. This library makes it easy to create beautiful, well-behaved, type-safe CLIs for Node.js and for web browsers.

- **Isomorphic**: As far as we know, this is the _only_ [isomorphic JavaScript](https://en.wikipedia.org/wiki/Universal_JavaScript) CLI framework. Run your browser CLI in a [terminal emulator](https://xtermjs.org/) like our [online examples](https://web.archive.org/web/20240603163500/https://cli.carnesen.com/) or in the browser's built-in terminal, [the JavaScript console](https://developers.google.com/web/tools/chrome-devtools/console)!

- **Intelligent types**: This is first and foremost a [TypeScript](https://en.wikipedia.org/wiki/TypeScript) library. All components are intelligently typed, and our built-in parsers ensure that the types are respected at runtime.

- **Automatic documentation**: Build your CLI with our factories, and we'll automatically generate pretty-good command-line usage out of the box. You can add `description`s and custom `<placeholder>`s to your command objects too, and we'll automatically fold the text to fit the user's terminal.

- **Built-in color decoration**: Bring your CLI to life with our `color` helpers injected automatically into your command `action` function.

- **Hidden commands**: Add "hidden=true" to any argument/command/group, and we'll hide it in the automatic usage docs. We use this feature for easter eggs and internal-only/beta commands.

- **Automatic autocomplete** (Coming some day!): [Autocomplete](https://en.wikipedia.org/wiki/Autocomplete) supercharges a CLI. We've implemented automatic autocomplete in [the live examples](https://web.archive.org/web/20240603163500/https://cli.carnesen.com/) and plan to [add this as a feature to the core library](https://web.archive.org/web/20220524200121/https://github.com/carnesen/cli/issues/32) in a future release.

- **REPL** (Coming some day!): The [live examples](https://web.archive.org/web/20240603163500/https://cli.carnesen.com/) are implemented as a custom [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). In a future release we'll lift that code into the framework to make it just as easy to build a REPL as it is to build a CLI.

## Stability

This library has over 99% line test coverage and heavy usage by its authors but should be considered [0.x beta software](https://semver.org/spec/v1.0.0.html#spec-item-6).

## More information

Questions, bugs, feature requests? Please [file an issue](https://github.com/carnesen/ccli/issues/new) or [submit a pull request](https://github.com/carnesen/ccli/compare) on [this project's repository on GitHub](https://github.com/carnesen/ccli#readme), and check out our:
- [Interactive examples](https://web.archive.org/web/20240603163500/https://cli.carnesen.com/)
- [Online documentation](https://web.archive.org/web/20240805103349/https://cli.carnesen.com/docs/latest/)
- [Example project](https://web.archive.org/web/20220523231901/https://github.com/carnesen/cli/tree/master/packages/cli-examples)

## Previous versions

Previous versions of the software are available [on GitHub](https://github.com/carnesen/ccli/tags) and the [npm registry](https://www.npmjs.com/package/@carnesen/cli). The website is no longer online, but its documentation is preserved on the [Internet Archive](https://web.archive.org/web/*/https://cli.carnesen.com/docs/latest):

- [0.9.0](https://web.archive.org/web/20240805103349/https://cli.carnesen.com/docs/latest/)
- [0.7.1](https://web.archive.org/web/20220524200134/https://cli.carnesen.com/docs/latest/)
- [0.6.0](https://web.archive.org/web/20220320093309/https://cli.carnesen.com/docs/latest/)

## License

[MIT](https://en.wikipedia.org/wiki/MIT_License) © [Chris Arnesen](https://www.carnesen.com)
