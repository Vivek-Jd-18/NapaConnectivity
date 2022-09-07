FROM node:16-alpine

RUN mkdir -p /napa
WORKDIR /napa
COPY package*.json ./

COPY next.config.js ./next.config.js
COPY tsconfig.json tsconfig.json

COPY /src/pages ./src/pages
COPY public ./public
COPY styles ./styles

RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN yarn install

CMD ["yarn", "dev"]