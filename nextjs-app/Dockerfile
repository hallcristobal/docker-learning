ARG NODE_VERSION=21.7.3

FROM node:${NODE_VERSION}-alpine as base

FROM base as build

# ENV NODE_ENV=production

WORKDIR /app
ADD . /app

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM base as main
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD node server.js
