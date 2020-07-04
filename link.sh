#!/bin/bash

set -exo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "${SCRIPT_DIR}"

cd main
npm link
npm run build
cd ..

cd examples
npm link
npm link @carnesen/cli
npm run build
cd ..

cd website
npm link
npm link @carnesen/cli
npm link @carnesen/cli-examples
npm run build
cd ..

cd website-server
npm link
npm link @carnesen/cli
npm link @carnesen/cli-examples
npm link @carnesen/cli-website
npm run build
cd ..
