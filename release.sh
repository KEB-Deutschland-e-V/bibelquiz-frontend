#!/bin/bash
# Release a new Version

branch=$(git symbolic-ref --short HEAD)
file="/opt/docker/frontend.sh"
url="https://dasbibelquiz.de/version.txt"
tag="latest"
port=8080
env="production"

# Check if the branch is "main" or "develop"
if [ "$branch" == "main" ]; then
  # Perform actions for the "main" branch
  echo "On the main branch, LIVE UPDATE!"
elif [ "$branch" == "develop" ]; then
  # Perform actions for the "develop" branch
  echo "On the develop branch, beta Update"
  file="/opt/docker/beta-frontend.sh"
  url="https://beta.dasbibelquiz.de/version.txt"
  tag="beta"
  port=16080
  VERSION="$VERSION-beta"
  env="beta"
else
  # Ignore all other branches
  echo "Not on main or develop branch"
  exit 0
fi

echo "Release a new Version"
git add .
git commit -m "$1"
#npm version patch
VERSION=$(jq -r '.version' package.json)
echo "Version: $VERSION"

# TODO: Add $1 to package and CHANGELOG with date and version

echo "Building new Artifact"
podman build -t bibelquiz-frontend:$tag --build-arg=port=$port --build-arg=env=$env .
podman tag bibelquiz-frontend:$tag dsigmund/bibelquiz-frontend:$tag
podman tag bibelquiz-frontend:$tag dsigmund/bibelquiz-frontend:$VERSION
podman push dsigmund/bibelquiz-frontend:$VERSION
podman push dsigmund/bibelquiz-frontend:$tag
echo "Done"

echo "Updating on Server"
OLD_VERSION=$(curl -k -X GET $url --silent)
echo "Old Version: $OLD_VERSION"

ssh root@46.182.21.244 $file

sleep 5s

NEW_VERSION=$(curl -k -X GET $url --silent)
echo "New Version: $NEW_VERSION"

echo "Updating on Github"
git push
git tag "$VERSION" -m "$1"
git push --tags
echo "Done."
