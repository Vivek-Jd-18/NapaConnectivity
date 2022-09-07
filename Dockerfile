FROM node:16-alpine

RUN mkdir -p /napa
WORKDIR /napa
COPY package*.json ./
