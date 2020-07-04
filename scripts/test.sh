#!/bin/bash

set -exo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "${SCRIPT_DIR}"
cd ..

cd main
npm run test
cd ..

cd examples
npm run test
cd ..

cd website
npm run test
cd ..

cd website-server
npm run test
cd ..
