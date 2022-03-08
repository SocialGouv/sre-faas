
FROM node:16-alpine

ARG FUNCTION=hello

WORKDIR /app

COPY functions/$FUNCTION/ .

# early fail
RUN [[ -f "index.js" ]] || (echo "⚠ index.js not found"; exit 1)
RUN [[ -f "package.json" ]] || (echo "⚠ package.json not found"; exit 1)

RUN yarn --production

USER 1000

ENV NODE_ENV=production

# https://maximorlov.com/process-signals-inside-docker-containers/
CMD ["node", "index.js"]