FROM node:16-alpine

RUN mkdir -p /napa
WORKDIR /napa
COPY package*.json yarn.lock ./

RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN yarn install

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json


CMD ["yarn", "dev"]