#!/bin/bash

cd /SERVICE

CONFIG_ARGS="s|CONFIG_PORT|${CONFIG_PORT}|g;\
        	s|CONFIG_MONGO_URI|${CONFIG_MONGO_URI}|g;\
			s|CONFIG_DOMAIN|${CONFIG_DOMAIN}|g"

sed -i -e "$CONFIG_ARGS" .env

yarn start

exec "$@"