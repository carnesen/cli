#!/bin/bash

# This script calls "npm link" (https://docs.npmjs.com/cli/link) on this
# monorepo's packages to link them together for local development.

set -eo pipefail # exit on error

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_DIR="$(dirname "${SCRIPT_DIR}")"
cd "${REPO_DIR}"

set -o xtrace # print each command before it's executed

cd packages

cd cli
npm install
npm link
npm run build
cd docs
npm link
cd ../..

cd cli-examples
# We need to run "npm install" explicitly because we use the --no-bin-links
# option when running "npm link" below
npm install
#  Use --no-bin-links otherwise this step fails when lib/cli.js does not exist
npm link --no-bin-links
npm link @carnesen/cli
npm run build
cd ..

cd cli-website
npm link
# Linking multiple packages at once is not documented but it works
# https://stackoverflow.com/a/69491736/2793540
npm link @carnesen/cli @carnesen/cli-examples
npm link 
npm run build
cd ..

cd cli-website-server
npm link
npm link @carnesen/cli-docs @carnesen/cli-website
npm run build
cd ..
