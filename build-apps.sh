#!/bin/bash

VERSION=$(jq -r '.version' package.json)
echo "Version: $VERSION"

echo "Compile Angular"
npm run cordova


echo "Build Android"
(cd native && cordova build android --release)

echo "Build iOS"
(cd native && cordova build ios --release)

echo "Build Electron"
(cd native && cordova build electron --release)

echo "Done"