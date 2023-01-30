#!/bin/bash
tar --exclude="node_modules" --exclude="dist" --exclude=".env" --exclude=".github" --exclude="yarn.lock" --exclude=".idea" --exclude="deploy" --exclude="public"   -zcvf SERVICE.tgz *
cp SERVICE.tgz ./deploy && rm -rf SERVICE.tgz
cd ./deploy && chmod +x deploy.sh
read -p "Enter version: " VERSION
export VERSION=$VERSION
./deploy.sh