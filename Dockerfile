FROM node:14
WORKDIR /app

COPY ./website/package.json .
RUN yarn install
COPY ./website/public ./public/
COPY ./website/src ./src/
RUN yarn build


