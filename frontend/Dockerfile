# Stage 1: Build app
FROM node:22 AS builder

WORKDIR /app

# On Railway, to access environment variables during container build, you must declare them as arguments
# Reference: https://docs.railway.app/deploy/dockerfiles
ARG INTERNAL_API_BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Run app
FROM node:22 AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app ./

CMD ["yarn", "start"]
