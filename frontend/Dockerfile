# Stage 1: Install dependencies
FROM node:18 AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Stage 2: Build source
FROM node:18 AS builder

# On Railway, to access environment variables during container build, you must declare them as arguments
# Reference: https://docs.railway.app/deploy/dockerfiles
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build

# Stage 3: Run
FROM node:18 AS runner

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD export PORT="${PORT:-3000}" \ 
    && node server.js
