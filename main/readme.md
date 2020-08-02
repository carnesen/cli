Command-line interfaces for Node.js and the browser

[![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/cli) [![github stars badge](https://img.shields.io/github/stars/carnesen/cli)](https://github.com/carnesen/cli)

The `carnesen/cli` package includes:
- Runtime JavaScript files (ES2019 + CommonJS)
- TypeScript type declarations (3.7+)

This library has _no_ dependencies and is known to work with Node.js 12+ and all modern web browsers.

## Features
- **Easy to use**: We ❤️ CLI's and want to use them everywhere for everything. This library makes it easy as can be to create beautiful easy-to-use CLIs for Node.js and for web browsers.

- **Browser compatible**: As far as we know, this is the universe's _only_ [universal/isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) CLI framework that actively supports the web browser as an execution environment. Your application can run in a [terminal emulator](https://xtermjs.org/) like our [online examples](https://cli.carnesen.com/), or use the browser's built-in terminal, [the JavaScript console](https://developers.google.com/web/tools/chrome-devtools/console)!

- **Intelligent types**: This is first and foremost a TypeScript library. All components are intelligently typed, and our built-in argument parsers ensure that the types are respected at runtime.

- **Automatic documentation**: Build your CLI with our factories, and we'll take care of the rest. If you add descriptions to your commands, we'll re-wrap the text to fit the user's terminal. Not ready to expose a feature yet? Simply add "hidden=true" to any command/branch/argument, and we'll hide it in the automatic documentation.

- **Built-in ANSI decoration**: Bring your CLI to life with our built-in [ANSI text decoration](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors) methods.

- **Automatic autocomplete** (Coming soon!): [Autocomplete](https://en.wikipedia.org/wiki/Autocomplete) supercharges a CLI. We've implemented automatic autocomplete in [the live examples](https://cli.carnesen.com) and plan to [add this as a feature to the core library](https://github.com/carnesen/cli/issues/32) in the next release.

## Stability
This library has 99% test coverage and heavy usage by its authors but should be considered 0.x beta software.

## More information
Questions, bugs, feature requests? Please [file an issue](https://github.com/carnesen/cli/issues/new) or [submit a pull request](https://github.com/carnesen/cli/compare) on [this project's repository on GitHub](https://github.com/carnesen/cli#readme), and check out our:
- [Interactive examples](https://cli.carnesen.com/)
- [Online documentation](https://cli.carnesen.com/docs)
- [Example project](https://github.com/carnesen/cli/tree/master/examples)

## License
[MIT](https://en.wikipedia.org/wiki/MIT_License) © [Chris Arnesen](https://www.carnesen.com)
