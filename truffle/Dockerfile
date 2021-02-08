FROM node:12
WORKDIR /app

COPY package.json .
RUN yarn global add truffle
RUN yarn

COPY ./contracts/ ./contracts/
COPY ./migrations/ ./migrations/
COPY ./test/ ./test/
COPY ./truffle-config.js .
COPY ./secrets.js .
