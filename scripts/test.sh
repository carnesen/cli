#!/bin/bash

# This script calls "npm test" in each of this monorepo's packages

set -eo pipefail # exit on error
set -o xtrace # print each command before it's executed

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR="$(dirname "${SCRIPT_DIR}")"
cd "${REPO_DIR}"

cd main
npm test
cd ..

cd examples
npm test
cd ..

cd website
npm test
cd ..

cd website-server
npm test
cd ..
