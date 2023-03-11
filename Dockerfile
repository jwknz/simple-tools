FROM node:18.15-alpine3.17

COPY ./package.json .

RUN yarn install

COPY . .

CMD ["yarn", "start"]