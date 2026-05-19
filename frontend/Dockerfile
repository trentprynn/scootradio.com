# BASE DEPENDENCIES
FROM node:24 AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./

RUN npm ci

# DEVELOPMENT (HOT RELOADING)
FROM base AS dev

COPY . .

CMD ["sh", "-c", "npm ci && npm run dev -- --hostname 0.0.0.0 --webpack"]

# PRODUCTION BUILD
FROM base AS builder

# Railway build-time variables must be declared as ARGs in the stage where they are used
# Reference: https://docs.railway.com/builds/dockerfiles#using-variables-at-build-time
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED=$NEXT_PUBLIC_ZOD_LOUD_FAIL_ENABLED

COPY . .

RUN npm run build

# PRODUCTION RUNTIME
FROM node:24 AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "start"]
