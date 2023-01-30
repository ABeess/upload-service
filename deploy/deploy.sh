#!/bin/bash
sudo docker buildx create --name abeesdevjs-builder --driver docker-container --bootstrap
sudo docker buildx use abeesdevjs-builder
sudo docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t abeesdevjs/upload-service:$VERSION -f Dockerfile --push .
echo abeesdevjs/upload-service:$VERSION
