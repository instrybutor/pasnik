# Nodejs Base image
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./

# install and app dependencies
RUN npm install
#ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD npm run nx serve ${APP_NAME} --host 0.0.0.0
