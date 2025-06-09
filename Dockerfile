# Этап 1: билд
FROM node:22-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# Этап 2: продакшн
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY prisma ./prisma

CMD ["npm", "run", "start:prod"]
