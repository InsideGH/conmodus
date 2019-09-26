#!/bin/bash

DOT_ENV_FILE=.env
USERNAME=$(grep USERNAME $DOT_ENV_FILE| cut -d '=' -f 2-)
VERSION=$(grep VERSION $DOT_ENV_FILE| cut -d '=' -f 2-)
IMAGE_PREFIX=$(grep IMAGE_PREFIX $DOT_ENV_FILE| cut -d '=' -f 2-)
TAG=live

echo Reading version from file: $DOT_ENV_FILE
echo Using version: $VERSION
echo Using username: $USERNAME
echo Using tag: $TAG

echo "---------------------"
echo Building live...
make live_build

FRONTEND_SRC=${IMAGE_PREFIX}_frontend:$TAG
FRONTEND_DST_VERSION=$USERNAME/${IMAGE_PREFIX}_frontend:$VERSION
FRONTEND_DST_LATEST=$USERNAME/${IMAGE_PREFIX}_frontend:latest

API_GATEWAY_SRC=${IMAGE_PREFIX}_api_gateway:$TAG
API_GATEWAY_DST_VERSION=$USERNAME/${IMAGE_PREFIX}_api_gateway:$VERSION
API_GATEWAY_DST_LATEST=$USERNAME/${IMAGE_PREFIX}_api_gateway:latest

CMS_SRC=${IMAGE_PREFIX}_cms:$TAG
CMS_DST_VERSION=$USERNAME/${IMAGE_PREFIX}_cms:$VERSION
CMS_DST_LATEST=$USERNAME/${IMAGE_PREFIX}_cms:latest

NGINX_SRC=${IMAGE_PREFIX}_nginx:$TAG
NGINX_DST_VERSION=$USERNAME/${IMAGE_PREFIX}_nginx:$VERSION
NGINX_DST_LATEST=$USERNAME/${IMAGE_PREFIX}_nginx:latest

echo "---------------------"
echo "Tagging images with version=$VERSION and latest"

docker tag $FRONTEND_SRC $FRONTEND_DST_VERSION
docker tag $FRONTEND_SRC $FRONTEND_DST_LATEST
echo Tagged $FRONTEND_DST_VERSION
echo Tagged $FRONTEND_DST_LATEST

docker tag $CMS_SRC $CMS_DST_VERSION
docker tag $CMS_SRC $CMS_DST_LATEST
echo Tagged $CMS_DST_VERSION
echo Tagged $CMS_DST_LATEST

docker tag $API_GATEWAY_SRC $API_GATEWAY_DST_VERSION
docker tag $API_GATEWAY_SRC $API_GATEWAY_DST_LATEST
echo Tagged $API_GATEWAY_DST_VERSION
echo Tagged $API_GATEWAY_DST_LATEST

docker tag $NGINX_SRC $NGINX_DST_VERSION
docker tag $NGINX_SRC $NGINX_DST_LATEST
echo Tagged $NGINX_DST_VERSION
echo Tagged $NGINX_DST_LATEST

echo "---------------------"
echo "Pushing images to docker hub"

docker push $FRONTEND_DST_VERSION
docker push $FRONTEND_DST_LATEST

docker push $API_GATEWAY_DST_VERSION
docker push $API_GATEWAY_DST_LATEST

docker push $CMS_DST_VERSION
docker push $CMS_DST_LATEST

docker push $NGINX_DST_VERSION
docker push $NGINX_DST_LATEST
