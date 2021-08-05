#!/bin/bash

docker build -t bibelquiz/frontend:latest . 

docker stop bibelquiz-frontend || :

docker rm bibelquiz-frontend || :

docker run \
--name bibelquiz-frontend \
--restart unless-stopped \
--publish "${BQ_FRONTEND_PORT}":8080 \
-d bibelquiz/frontend:latest