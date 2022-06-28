#!/bin/bash

VERSION=$(jq -r '.version' package.json)
echo "Version: $VERSION"

echo "Compile Angular"
npm run cordova

mkdir -p native/releases

echo "Build Android"
(cd native && cordova build android --release)
cp native/platforms/android/app/build/outputs/bundle/release/app-release.aab native/releases/bibelquiz-android.aab

echo "Build iOS"
(cd native && cordova build ios --release)
cp -r native/platforms/ios/build/emulator/DasBibelQuiz.app native/releases/bibelquiz-ios.app

echo "Build Electron"
(cd native && cordova build electron --release)
cp native/platforms/electron/build/DasBibelQuiz-1.0.0.dmg native/releases/bibelquiz-electron.dmg

echo "Done"