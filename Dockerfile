FROM node:16.8.0-alpine

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn config set loglevel warn --global
RUN yarn install

ADD . /app

RUN yarn run dockerfile

CMD yarn run start