#!/bin/bash

# Change to your own docker hub username
USERNAME=insidedocker

DOT_ENV_FILE=.env
VERSION=$(grep VERSION $DOT_ENV_FILE| cut -d '=' -f 2-)
TAG=live

echo Reading version from file: $DOT_ENV_FILE
echo Using version: $VERSION
echo Using username: $USERNAME
echo Using tag: $TAG

echo ""
echo Building live...
echo ""
make live_build

FRONTEND_SRC=conmodus_frontend:$TAG
FRONTEND_DST_VERSION=$USERNAME/conmodus_frontend:$VERSION
FRONTEND_DST_LATEST=$USERNAME/conmodus_frontend:latest

API_GATEWAY_SRC=conmodus_api_gateway:$TAG
API_GATEWAY_DST_VERSION=$USERNAME/conmodus_api_gateway:$VERSION
API_GATEWAY_DST_LATEST=$USERNAME/conmodus_api_gateway:latest

NGINX_SRC=conmodus_nginx:$TAG
NGINX_DST_VERSION=$USERNAME/conmodus_nginx:$VERSION
NGINX_DST_LATEST=$USERNAME/conmodus_nginx:latest

docker tag $FRONTEND_SRC $FRONTEND_DST_VERSION
docker tag $FRONTEND_SRC $FRONTEND_DST_LATEST
echo Tagged $FRONTEND_DST_VERSION
echo Tagged $FRONTEND_DST_LATEST

docker tag $API_GATEWAY_SRC $API_GATEWAY_DST_VERSION
docker tag $API_GATEWAY_SRC $API_GATEWAY_DST_LATEST
echo Tagged $API_GATEWAY_DST_VERSION
echo Tagged $API_GATEWAY_DST_LATEST

docker tag $NGINX_SRC $NGINX_DST_VERSION
docker tag $NGINX_SRC $NGINX_DST_LATEST
echo Tagged $NGINX_DST_VERSION
echo Tagged $NGINX_DST_LATEST

docker push $FRONTEND_DST_VERSION
docker push $FRONTEND_DST_LATEST

docker push $API_GATEWAY_DST_VERSION
docker push $API_GATEWAY_DST_LATEST

docker push $NGINX_DST_VERSION
docker push $NGINX_DST_LATEST
