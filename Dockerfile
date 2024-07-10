FROM node:20-alpine as builder

WORKDIR /app
COPY . .

ARG VITE_API_URL
ARG VITE_TON_CONNECT_MANIFEST_URL
ARG VITE_TON_API_KEY
ARG VITE_NFT_COLLECTION_ADDRESS
ARG VITE_IS_TON_PRODUCTION
ARG VITE_GA_SECRET
ARG VITE_GA_KEY
ARG VITE_NFT_COLLECTION_URL
ARG VITE_GA_BUILD
ARG SENTRY_AUTH_TOKEN
ARG VITE_SENTRY_DSN

ENV NODE_OPTIONS=--max-old-space-size=4096

RUN yarn install --frozen-lockfile \
    && yarn add sharp --ignore-engines && yarn run build \
    && cp -a dist/. public/

FROM nginx:1.19-alpine AS server

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/public /usr/share/nginx/html

