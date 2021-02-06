#!/bin/bash

# Delete all node_modules and lib folders in this monorepo

set -eo pipefail # exit on error

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR="$(dirname "${SCRIPT_DIR}")"
cd "${REPO_DIR}"

set -o xtrace # print each command before it's executed

rm -rf **/node_modules **/lib
