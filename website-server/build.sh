#!/bin/bash

set -eo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}"

echo 'Writing git version file to dist/'
rm -rf dist/
mkdir dist/
echo -n `node --print 'require("./package.json").version'` > "dist/version"
echo -n `git -C "${SCRIPT_DIR}" rev-parse HEAD` > "dist/commithash"

echo "Compiling TypeScript to lib/"
rm -rf lib/
tsc
