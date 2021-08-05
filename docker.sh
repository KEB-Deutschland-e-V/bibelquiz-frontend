#!/bin/bash

docker build -t bibelquiz/frontend:latest . 

docker stop bibelquiz-frontend || :

docker rm bibelquiz-frontend || :

docker run \
--name bibelquiz-frontend \
--restart unless-stopped \
--network="host" \
-d bibelquiz/frontend:latest