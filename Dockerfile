FROM node:20-alpine

EXPOSE 3000
WORKDIR /app
COPY . .

RUN apk add --update --no-cache ruby ruby-dev ruby-bundler build-base curl

RUN npm install
RUN npm run build
RUN npx prisma generate
RUN npm prune --omit=dev
RUN npm cache clean --force

CMD ["npm", "run", "start"]
