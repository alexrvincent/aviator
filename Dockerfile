FROM node:16-alpine

RUN mkdir /aviator

WORKDIR /aviator

ADD package.json /aviator/package.json
ADD yarn.lock /aviator/yarn.lock

RUN yarn config set loglevel warn --global
RUN yarn install --prod

ADD . /aviator

RUN yarn build-server

EXPOSE 8000

CMD [ "yarn", "start" ]