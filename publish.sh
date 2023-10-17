#!/bin/bash

VERSION=$(jq -r '.version' package.json)

echo "new Version: $VERSION"

podman build --platform=linux/amd64 --no-cache -t bibelquiz-frontend:latest .

echo "tagging and pushing to dockerhub"
podman tag bibelquiz-frontend:latest dsigmund/bibelquiz-frontend:latest
podman tag bibelquiz-frontend:latest dsigmund/bibelquiz-frontend:"$VERSION"

echo "pushing to dockerhub"
podman push dsigmund/bibelquiz-frontend:latest
podman push dsigmund/bibelquiz-frontend:"$VERSION"

echo "done"
