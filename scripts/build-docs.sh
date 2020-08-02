#!/usr/bin/env bash

set -eo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$( cd "$( dirname "${SCRIPT_PATH}" )" >/dev/null 2>&1 && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

cd "${PROJECT_DIR}"

function usage() {
	2>&1 cat <<EOF
$(basename "${SCRIPT_PATH}") [--watch]
EOF
	exit 1
}

if [ "$1" = "--watch" ]; then
	./node_modules/.bin/nodemon \
		--ext ts,css,md,sh \
		--ignore docs/ \
		--ignore typedoc.md \
		--exec bash -- "${SCRIPT_PATH}"
	exit $?
fi

if [ -n "${1}" ]; then
	2>&1 echo "Error: Invalid argument \"${1}\""
	usage
fi

rm -rf docs/
mkdir docs/

cat readme.md usage.md > typedoc.md
./node_modules/.bin/typedoc \
	--mode library \
	--readme typedoc.md \
	--inputFiles src/index.ts \
	--out docs/ \
	--theme theme/

cp -r images/ docs/images/

"${SCRIPT_DIR}/print-docs-package-json.js" > docs/package.json
cp license.txt docs/
echo > docs/.npmignore

> docs/readme.md cat <<EOF
Documentation for [**@carnesen/cli**](https://cli.carnesen.com/docs)

[![build status badge](https://github.com/carnesen/cli/workflows/test/badge.svg)](https://github.com/carnesen/cli/actions?query=workflow%3Atest+branch%3Amaster) [![npm version badge](https://badge.fury.io/js/%40carnesen%2Fcli-docs.svg)](https://www.npmjs.com/package/@carnesen/cli-docs) [![github stars badge](https://img.shields.io/github/stars/carnesen/cli)](https://github.com/carnesen/cli)

Questions, bugs, feature requests? Please [file an issue](https://github.com/carnesen/cli/issues/new) or [submit a pull request](https://github.com/carnesen/cli/compare) on [this project's repository on GitHub](https://github.com/carnesen/cli#readme), and check out our:
- [Interactive examples](https://cli.carnesen.com/)
- [Online documentation](https://cli.carnesen.com/docs)
- [Example project](https://github.com/carnesen/cli/tree/master/examples)

[MIT](https://en.wikipedia.org/wiki/MIT_License) © [Chris Arnesen](https://www.carnesen.com)

EOF
