# Stage 1: Build stage
FROM node:20.17.0-alpine AS builder

RUN npm install -g pnpm@8.15.1

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:20.17.0-alpine

WORKDIR /app

RUN npm install -g pnpm@8.15.1

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm

EXPOSE 3000

CMD ["pnpm", "start:prod"]