# Nodejs Base image
FROM node:14-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

CMD yarn install
