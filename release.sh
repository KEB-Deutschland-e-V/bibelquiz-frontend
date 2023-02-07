#!/bin/bash
# Release a new Version

# user input
if [ -z "$1" ]
  then
    echo "No patch level supplied (p, m, M, 0)"
    exit 1
fi
if [ -z "$2" ]
  then
    echo "No commit message supplied"
    exit 2
fi
LEVEL=$1
MESSAGE=$2

# variables
VERSION=$(jq -r '.version' package.json)
BRANCH=$(git symbolic-ref --short HEAD)
FILE="/opt/docker/frontend.sh"
URL="https://dasbibelquiz.de/version.txt"
TAG="latest"
PORT=8080
ENVIRONMENT="production"

# incremtent version on patch level without npm version patch
IFS=. read -r MAJOR MINOR PATCH <<< "$VERSION"
if [ "$LEVEL" == "p" ]; then
  PATCH=$((PATCH + 1))
elif [ "$LEVEL" == "m" ]; then
  MINOR=$((MINOR + 1))
  PATCH=0
elif [ "$LEVEL" == "M" ]; then
  MAJOR=$((MAJOR + 1))
  MINOR=0
  PATCH=0
elif [ "$LEVEL" == "0" ]; then
  echo "No version increment"
else
  echo "No valid patch level supplied (p, m, M)"
  exit 3
fi
VERSION="$MAJOR.$MINOR.$PATCH"
echo "Version: $VERSION"

# if level != 0
if [ "$LEVEL" != "0" ]; then
  # insert version into package.json
  echo "Inserting version into package.json: $VERSION"
  jq --arg VERSION "$VERSION" '.version = $VERSION' package.json > package.json.tmp && mv package.json.tmp package.json

  # add commit message with date into package.json
  CHANGE=$VERSION";"$MESSAGE
  echo "Inserting change into package.json-changelog: $CHANGE"
  jq --arg CHANGE "$CHANGE"'.changelog += [$CHANGE]' package.json > package.json.tmp && mv package.json.tmp package.json
fi


# Check if the branch is "main" or "develop"
if [ "$BRANCH" == "main" ]; then
  # Perform actions for the "main" branch
  echo "On the main branch, LIVE UPDATE!"
elif [ "$BRANCH" == "develop" ]; then
  # Perform actions for the "develop" branch
  echo "On the develop branch, beta Update"
  FILE="/opt/docker/beta-frontend.sh"
  URL="https://beta.dasbibelquiz.de/version.txt"
  TAG="beta"
  PORT=16080
  VERSION="$VERSION-beta"
  ENVIRONMENT="beta"
else
  # Ignore all other branches
  echo "Not on main or develop branch"
  exit 0
fi

echo "Release a new Version"
git add .
git commit -m "$1" 


echo "Building new Artifact:bibelquiz-frontend:$TAG for POrt $PORT and Environment $ENVIRONMENT"
podman build -t bibelquiz-frontend:$TAG --build-arg=PORT=$PORT --build-arg=ENVIRONMENT=$ENVIRONMENT .
podman tag bibelquiz-frontend:$TAG dsigmund/bibelquiz-frontend:$TAG
podman tag bibelquiz-frontend:$TAG dsigmund/bibelquiz-frontend:$VERSION
podman push dsigmund/bibelquiz-frontend:$VERSION
podman push dsigmund/bibelquiz-frontend:$TAG
echo "Done"

echo "Updating on Server"
OLD_VERSION=$(curl -k -X GET $URL --silent)
echo "Old Version: $OLD_VERSION"

ssh root@46.182.21.244 $FILE

sleep 5s

NEW_VERSION=$(curl -k -X GET $URL --silent)
echo "New Version: $NEW_VERSION"
# if OLD_VERSION != NEW_VERSION then success
if [ "$OLD_VERSION" != "$NEW_VERSION" ]; then
  echo "Update successful"
else
  echo "Update failed"
  exit 4
fi

echo "Updating on Github"
git push
git tag "$VERSION" -m "$1"
git push --tags
echo "Done."
