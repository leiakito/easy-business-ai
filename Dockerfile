# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS build

RUN apk add --no-cache \
    libc6-compat \
    openssl \
    openssl-dev \
    build-base


FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml prisma ./

RUN npm install

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/.velite ./.velite

RUN npx prisma generate --schema=prisma/schema.prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]