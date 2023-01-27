FROM node:18-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./lerna.json ./

RUN npm ci

WORKDIR /app/packages/components

COPY ./packages/components ./

RUN npm ci

WORKDIR /app/packages/utils

COPY ./packages/utils ./

RUN npm ci

WORKDIR /app/packages/pokedex

COPY ./packages/pokedex ./

RUN npm ci

WORKDIR /app

RUN npx lerna run build

WORKDIR /app/packages/pokedex

ENV NODE_ENV production

USER node

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]