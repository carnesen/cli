#!/usr/bin/env bash

# This script is invoked by "npm test". It was getting to be too much to fit on
# one line in package.json.

set -eo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$( cd "$( dirname "${SCRIPT_PATH}" )" >/dev/null 2>&1 && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

cd "${PROJECT_DIR}"

export PATH="./node_modules/.bin:${PATH}"

SEMVER_BUMP=${1:-""}

if [ "${SEMVER_BUMP}" = "" ]; then
	echo "Usage: ${SCRIPT_PATH} <semver bump>"
	exit 1
fi

carnesen-dev release --semverBump "${SEMVER_BUMP}"

# "carnesen-dev release" runs the build again which writes the package.json in
# the docs directory. So we don't need to do another version bump.
carnesen-dev release docs --semverBump none
