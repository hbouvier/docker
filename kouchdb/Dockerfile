FROM node:8-alpine

COPY ./src /app

WORKDIR /app

ENV NODE_ENV=production

RUN npm --production install

CMD node bootstrap
