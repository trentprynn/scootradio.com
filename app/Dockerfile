# Stage 1: Install dependencies
FROM node:16 AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Stage 2: Build source
FROM node:16 AS build

# On Railway, to access environment variables during container build, you must declare them as arguments
# Reference: https://docs.railway.app/deploy/dockerfiles
ARG NEXT_PUBLIC_AUTH0_DOMAIN
ARG NEXT_PUBLIC_AUTH0_CLIENT_ID
ARG NEXT_PUBLIC_AUTH0_AUDIENCE
ARG NEXT_PUBLIC_API_URL

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build

# Stage 3: Run
FROM node:16 AS runner

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

CMD export PORT="${PORT:-3000}" \ 
    && node server.js
