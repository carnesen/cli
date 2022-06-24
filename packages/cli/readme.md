A command-line interface (CLI) framework for Node.js and web browser

[![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/cli) [![github stars badge](https://img.shields.io/github/stars/carnesen/cli)](https://github.com/carnesen/cli)

The **@carnesen/cli** package includes runtime JavaScript files (ES2019 +
CommonJS) and TypeScript type declarations (3.7+). It has _no_ npm dependencies
and is known to work with Node.js 12+ and all modern web browsers.

## Features

- **Easy to use**: We ❤️ CLIs and want to use them everywhere for everything. This library makes it easy to create beautiful, well-behaved, type-safe CLIs for Node.js and for web browsers.

- **Isomorphic**: As far as we know, this is the _only_ [isomorphic JavaScript](https://en.wikipedia.org/wiki/Universal_JavaScript) CLI framework. Run your browser CLI in a [terminal emulator](https://xtermjs.org/) like our [online examples](https://cli.carnesen.com/) or in the browser's built-in terminal, [the JavaScript console](https://developers.google.com/web/tools/chrome-devtools/console)!

- **Intelligent types**: This is first and foremost a [TypeScript](https://en.wikipedia.org/wiki/TypeScript) library. All components are intelligently typed, and our built-in parsers ensure that the types are respected at runtime.

- **Automatic documentation**: Build your CLI with our factories, and we'll automatically generate pretty-good command-line usage out of the box. You can add `description`s and custom `<placeholder>`s to your command objects too, and we'll automatically fold the text to fit the user's terminal.

- **Built-in color decoration**: Bring your CLI to life with our `color` helpers injected automatically into your command `action` function.

- **Hidden commands** Add "hidden=true" to any argument/command/group, and we'll hide it in the automatic usage docs. We use this feature for easter eggs and internal-only/beta commands.

- **Automatic autocomplete** (Coming soon!): [Autocomplete](https://en.wikipedia.org/wiki/Autocomplete) supercharges a CLI. We've implemented automatic autocomplete in [the live examples](https://cli.carnesen.com) and plan to [add this as a feature to the core library](https://github.com/carnesen/cli/issues/32) in a future release.

## Stability

This library has 100% test coverage and heavy usage by its authors but should be considered [0.x beta software](https://semver.org/spec/v1.0.0.html#spec-item-6).

## More information

Questions, bugs, feature requests? Please [file an issue](https://github.com/carnesen/cli/issues/new) or [submit a pull request](https://github.com/carnesen/cli/compare) on [this project's repository on GitHub](https://github.com/carnesen/cli#readme), and check out our:
- [Homepage](https://cli.carnesen.com)
- [Online documentation](https://cli.carnesen.com/docs)
- [Example project](https://github.com/carnesen/cli/tree/master/examples)

## Previous versions

Previous versions of the software are available [on GitHub](https://github.com/carnesen/cli/releases) and the [npm registry](https://www.npmjs.com/package/@carnesen/cli). Previous versions of the online documentation are available on the [Internet Archive](https://web.archive.org/web/*/https://cli.carnesen.com/docs/latest):

- [0.7.1](https://web.archive.org/web/20220524200134/https://cli.carnesen.com/docs/latest/)
- [0.6.0](https://web.archive.org/web/20220320093309/https://cli.carnesen.com/docs/latest/)

## License

[MIT](https://en.wikipedia.org/wiki/MIT_License) © [Chris Arnesen](https://www.carnesen.com)
