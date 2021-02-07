#!/bin/bash

# This script calls "npm publish" on each of the packages in this monorepo and
# updates the internal dependecies accordingly.

set -eo pipefail # exit on error

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR="$(dirname "${SCRIPT_DIR}")"
cd "${REPO_DIR}"

set -o xtrace # print each command before it's executed

# cd main
# npm ci
# npm publish
# cd ..

# cd examples
# npm ci
# npm install @carnesen/cli@next
# npm publish
# cd ..

cd website
npm ci
npm install @carnesen/cli@next
npm install @carnesen/cli-examples@next
npm publish
cd ..

cd website-server
npm ci
npm install @carnesen/cli-docs@next
npm install @carnesen/cli-website@latest
npm publish
cd ..
