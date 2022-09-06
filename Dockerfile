FROM node:16-alpine

RUN mkdir -p /napa
WORKDIR /napa
COPY package*.json ./

RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN yarn install

COPY next.config.js ./next.config.js
COPY tsconfig.json tsconfig.json

COPY /src/pages ./src/pages
COPY public ./public
COPY styles ./styles

RUN yarn build

EXPOSE 5001

CMD ["yarn", "start"]