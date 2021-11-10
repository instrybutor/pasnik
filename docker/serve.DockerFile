# Nodejs Base image
FROM node:14-alpine
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
# install and app dependencies
COPY package*.json ./
RUN npm ci --prod

# start app
CMD npm run nx serve ${APP_NAME} --host 0.0.0.0
