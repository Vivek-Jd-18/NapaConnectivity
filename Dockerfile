FROM node:16-alpine

RUN mkdir -p /napa
WORKDIR /napa
COPY package*.json ./

COPY next.config.js ./next.config.js
COPY tsconfig.json tsconfig.json

COPY /src/pages ./src/pages
COPY public ./public
COPY styles ./styles

# RUN npm config set unsafe-perm true
# RUN npm install typescript
# RUN npm install ts-node
RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start"]