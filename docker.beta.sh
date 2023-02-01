#!/bin/bash

docker pull dsigmund/bibelquiz-frontend:beta

docker stop bibelquiz-beta-frontend || :

docker rm bibelquiz-beta-frontend || :

docker run \
--name bibelquiz-beta-frontend \
--restart unless-stopped \
--publish "${BQ_BETA_FRONTEND_PORT}":16080 \
-d dsigmund/bibelquiz-frontend:beta