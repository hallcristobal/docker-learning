ARG NODE_VERSION=21.7.3
ARG ALPINE_VERSION=3.19
FROM node:${NODE_VERSION}-alpine as build

ENV NODE_ENV=production

WORKDIR /app
ADD . /app

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM alpine:${ALPINE_VERSION} as main

WORKDIR /app

COPY --from=build /usr/lib /usr/lib
COPY --from=build /usr/local/lib /usr/local/lib
COPY --from=build /usr/local/include /usr/local/include
COPY --from=build /usr/local/bin /usr/local/bin
COPY --from=build /app/.next ./.next

EXPOSE 3000

RUN npm install -g next@latest
CMD npx next start