FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN ["mkdir", "-p", "/app/data/dataset"]

RUN ["mkdir", "-p", "/app/data/token"]

RUN [ "npm", "install", "-g", "pnpm" ]

RUN ["pnpm", "install", "--frozen-lockfile"]

CMD ["pnpm", "start"]


