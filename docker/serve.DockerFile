# Nodejs Base image
FROM node:14-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

# install and app dependencies
CMD yarn install
#ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD yarn run nx serve ${APP_NAME} --host 0.0.0.0
