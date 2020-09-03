#!/usr/bin/env bash

# This script is invoked by "npm test". It was getting to be too much to fit on
# one line in package.json.

set -eo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$( cd "$( dirname "${SCRIPT_PATH}" )" >/dev/null 2>&1 && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

cd "${PROJECT_DIR}"

npm run lint
npm run build
npm run unit-test -- --coverage
npm pack
cd docs
npm pack
