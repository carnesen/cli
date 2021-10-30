#!/bin/bash

# This script calls "npm publish" on each of the packages in this monorepo and
# updates the internal dependecies accordingly.

set -eo pipefail # exit on error

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR="$(dirname "${SCRIPT_DIR}")"
cd "${REPO_DIR}"

set -o xtrace # print each command before it's executed

cd main
npm ci
npm publish
cd ..

cd examples
npm ci
npm install @carnesen/cli@latest
npm publish
cd ..

cd website
npm ci
npm install @carnesen/cli@latest
npm install @carnesen/cli-examples@latest
npm publish
cd ..

cd website-server
npm ci
npm install @carnesen/cli-docs@latest
npm install @carnesen/cli-website@latest
npm publish
cd ..
