# Этап 1: билд
FROM node:22-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Этап 2: продакшн
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

# Простой старт, без миграций на этом этапе
CMD ["npm", "run", "start:prod"]
