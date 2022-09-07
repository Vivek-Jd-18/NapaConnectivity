FROM node:16-alpine

RUN mkdir -p /napa
WORKDIR /napa
COPY package*.json ./

COPY next.config.js ./napa/next.config.js
COPY tsconfig.json ./napa/tsconfig.json

COPY /src/pages ./napa/src/pages
COPY public ./napa/public
COPY styles ./napa/styles

RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN yarn install

CMD ["yarn", "dev"]