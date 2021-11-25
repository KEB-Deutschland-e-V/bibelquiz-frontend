#!/bin/bash

docker pull dsigmund/bibelquiz-frontend

docker stop bibelquiz-frontend || :

docker rm bibelquiz-frontend || :

docker run \
--name bibelquiz-frontend \
--restart unless-stopped \
--publish "${BQ_FRONTEND_PORT}":8080 \
-d dsigmund/bibelquiz-frontend:latest