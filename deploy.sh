#!/bin/bash

docker rmi $(docker images -f dangling=true -q)
docker-compose pull
docker-compose up -d
docker rmi $(docker images -f dangling=true -q)
