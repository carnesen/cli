#!/usr/bin/env bash

set -eo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$( cd "$( dirname "${SCRIPT_PATH}" )" >/dev/null 2>&1 && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

cd "${PROJECT_DIR}"

npm run lint
npm run build
npm run unit-test
npm pack
cd docs
npm pack
