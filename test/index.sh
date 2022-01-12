#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"


echo "waking up for snoretastic tests"

echo "CommonJS mode"
../index.js ../example/cjs.js --preview-output --wait-time=test

echo "ECMAScript Module mode"
../index.js ../example/esm.js --preview-output --wait-time=test

echo "snoretastic tests ready to sleep 💤💤💤"