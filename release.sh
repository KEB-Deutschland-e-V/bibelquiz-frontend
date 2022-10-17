#!/bin/bash
# Release a new Version

echo "Release a new Version"
git add .
git commit -m "$1"
npm version patch

echo "Building new Artifact"
bash build.sh
bash deploy.sh

echo "Updating on Github"
git push
git push --tags

echo "Done."
