FROM node:20-alpine

ARG SHOPIFY_CLI_PARTNERS_TOKEN
ENV SHOPIFY_CLI_PARTNERS_TOKEN=$SHOPIFY_CLI_PARTNERS_TOKEN
EXPOSE 3000
WORKDIR /app
COPY . .

RUN apk add --no-cache \
    ruby \
    ruby-dev \
    ruby-bundler \
    build-base \
    curl \
    openssl

#RUN apk add --update --no-cache ruby ruby-dev ruby-bundler build-base curl

RUN corepack enable pnpm
RUN pnpm install
RUN pnpm run build
RUN pnpx prisma generate
#RUN pnpm run deploy
RUN pnpm prune --prod
RUN pnpm store prune --force
#RUN cp .env .env.prod

CMD ["pnpm", "start"]
