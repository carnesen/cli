Command-line interfaces (CLIs) for Node.js and the web

[![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli.svg)](https://www.npmjs.com/package/@carnesen/cli) [![github stars badge](https://img.shields.io/github/stars/carnesen/cli)](https://github.com/carnesen/cli)

The **carnesen/cli** package includes runtime JavaScript files (ES2019 + CommonJS)
and TypeScript type declarations (3.7+). It has _no_ npm dependencies and is known to work with Node.js 12+ and all modern web browsers.

## Features
- **Easy to use**: We ❤️ CLIs and want to use them everywhere for everything. This library makes it easy to create beautiful well-behaved CLIs for Node.js and for web browsers.

- **Universal**: As far as we know, this is the universe's _only_ [universal JavaScript](https://en.wikipedia.org/wiki/Universal_JavaScript) CLI framework. Run your browser CLI in a [terminal emulator](https://xtermjs.org/) like our [online examples](https://cli.carnesen.com/) or in the browser's built-in terminal, [the JavaScript console](https://developers.google.com/web/tools/chrome-devtools/console)!

- **Intelligent types**: This is first and foremost a [TypeScript](https://en.wikipedia.org/wiki/TypeScript) library. All components are intelligently typed, and our built-in parsers ensure that the types are respected at runtime.

- **Automatic documentation**: Build your CLI with our factories, and we'll automatically generate pretty-good command-line usage out of the box. Even better if you add `description`s and custom `<placeholder>`s to your command objects, we'll automatically fold the text to fit the user's terminal.

- **Built-in ANSI decoration**: Bring your CLI to life with our built-in [ANSI text decoration](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors) methods.

- **Hidden commands** Add "hidden=true" to any argument/command/group, and we'll hide it in the usage documentations. We use this feature for easter eggs and internal/beta commands.

- **Automatic autocomplete** (Coming soon!): [Autocomplete](https://en.wikipedia.org/wiki/Autocomplete) supercharges a CLI. We've implemented automatic autocomplete in [the live examples](https://cli.carnesen.com) and plan to [add this as a feature to the core library](https://github.com/carnesen/cli/issues/32) for the next release.

## Stability
This library has 99% test coverage and heavy usage by its authors but should be considered 0.x beta software.

## More information
Questions, bugs, feature requests? Please [file an issue](https://github.com/carnesen/cli/issues/new) or [submit a pull request](https://github.com/carnesen/cli/compare) on [this project's repository on GitHub](https://github.com/carnesen/cli#readme), and check out our:
- [Homepage](https://cli.carnesen.com)
- [Online documentation](https://cli.carnesen.com/docs)
- [Example project](https://github.com/carnesen/cli/tree/master/examples)

## License
[MIT](https://en.wikipedia.org/wiki/MIT_License) © [Chris Arnesen](https://www.carnesen.com)
