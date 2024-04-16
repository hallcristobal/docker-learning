ARG NODE_VERSION=21.7.3

FROM node:${NODE_VERSION}-alpine as base

FROM base as build

ENV NODE_ENV=development

WORKDIR /app
ADD . /app
COPY .env .

RUN rm src/generated/client/*.node
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm exec prisma generate
RUN pnpm build

FROM base as main
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.env .
COPY --from=build /app/build .
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install --prod

EXPOSE 8080
ENV PORT 8080

CMD pnpm exec prisma migrate deploy ; node index.js