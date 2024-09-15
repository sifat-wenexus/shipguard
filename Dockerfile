FROM node:20-alpine

EXPOSE 3000
WORKDIR /app
COPY . .

RUN apk add --update --no-cache ruby ruby-dev ruby-bundler build-base curl

RUN pnpm install
RUN pnpm install
RUN pnpm run build
RUN pnpx prisma generate
RUN pnpm prune --prod
RUN pnpm cache clean --force

CMD ["pnpm", "start"]
