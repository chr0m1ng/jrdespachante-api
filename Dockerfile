FROM node:16-alpine

RUN corepack enable

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
    yarn global add --silent node-gyp

RUN [ "mkdir", "/app"]

WORKDIR /app

COPY package.json .

RUN [ "yarn" ]

COPY . .

ENV PORT=80

EXPOSE 80

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]
