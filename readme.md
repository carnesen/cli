Command-line interfaces for Node.js and the browser

[![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster) [![github stars badge](https://img.shields.io/github/stars/carnesen/cli)](https://github.com/carnesen/cli)

The @carnesen/cli package includes runtime JavaScript files for Node.js >=v10 and type declarations for TypeScript >=v3.8. API documentation is available on the web at [cli.carnesen.com](https://cli.carnesen.com/). This library has _no_ dependencies, so it works in a browser too! Check out [the online examples](https://cli.carnesen.com/examples/index.html) and [this project's repository on GitHub](https://github.com/carnesen/cli) for more information.

## Core concepts
The general structure of a `@carnesen/cli` is:
```
<branch> <command> <positional-args> --name <named-args> -- <escaped-args>
```
Only `<command>` is required.

## Stability
This library has 99% test coverage and heavy usage by its author but should be considered 0.x beta software.

## License
MIT © [Chris Arnesen](https://www.carnesen.com)
