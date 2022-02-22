FROM node:16-alpine

RUN corepack enable

RUN [ "mkdir", "/app"]

WORKDIR /app

COPY package.json .

RUN [ "yarn" ]

COPY . .

ENV PORT=80

EXPOSE 80

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]
