#!/bin/bash

set -exo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "${SCRIPT_DIR}"
cd ..

cd main
npm ci
npm publish
cd ..

cd examples
npm ci
npm install @carnesen/cli@next
npm publish
cd ..

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
