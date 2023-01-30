# Base image
FROM node:lts-alpine

WORKDIR /usr/src/upload_service

COPY package.json ./


RUN yarn

COPY . .

RUN yarn build


EXPOSE 3009


# Start the server using the production build
CMD [ "yarn", "start" ]

