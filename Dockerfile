# Multi-stage Dockerfile for building and running a Next.js + Elysia application with Bun runtime.
# 
# Stages:
#   - base: Sets up the base development environment with system dependencies
#   - deps: Installs project dependencies
#   - builder: Builds the Next.js application and Prisma schema
#   - runner: Production-ready image with optimized size and security

ARG PRISMA_VERSION=7.4.2

# =============================================================================
# Stage 1: BASE - Development foundation with system dependencies
# =============================================================================
# @description Prepares the base environment with Bun and required system packages
FROM dhi.io/bun:1.3.10-dev AS base
ARG PRISMA_VERSION

# Install OpenSSL required by Prisma
# RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
RUN apt-get update -y \
&& apt-get install -y openssl

# =============================================================================
# Stage 2: DEPS - Dependency installation
# =============================================================================
# @description Installs project dependencies from package.json and bun.lock
# @caching This stage is cached independently for better build performance
FROM base AS deps
WORKDIR /tmp/dev
COPY package.json bun.lock ./

# Install dependencies with frozen lockfile to ensure reproducible builds
RUN bun install --frozen-lockfile

# =============================================================================
# Stage 3: BUILDER - Application build compilation
# =============================================================================
# @description Compiles the Next.js application and generates Prisma client
# @env NEXT_TELEMETRY_DISABLED=1 Disable telemetry collection during build
# @env SKIP_ENV_VALIDATION=1 Skip environment variable validation (prod validation happens at runtime)
FROM deps AS builder
WORKDIR /tmp/builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1

COPY --from=deps /tmp/dev/node_modules ./node_modules
COPY . .

# Generate Prisma client from schema.prisma
RUN bunx prisma@${PRISMA_VERSION} generate

# Build Next.js application with output set to standalone
RUN bun run build

# =============================================================================
# Stage 4: RUNNER - Production-ready runtime image
# =============================================================================
# @description Final lightweight production image with only necessary artifacts
# @env NODE_ENV=production Ensures application runs in production mode
# @env PORT=3000 Application listens on port 3000
# @security Non-root user (uid 65532) for enhanced container security
FROM dhi.io/bun:1.3.10 AS runner
WORKDIR /app
ARG PRISMA_VERSION
ENV NODE_ENV=production
ENV PORT=3000

# Copy only necessary build artifacts from builder stage
# prisma/: Database schema (needed for migrations)
COPY --from=builder --chown=65532 /tmp/builder/prisma ./prisma

# prisma.config.ts: Prisma configuration file for runtime database connection
COPY --from=builder --chown=65532 /tmp/builder/prisma.config.ts ./

# generated/: Prisma client and other generated code
COPY --from=builder --chown=65532 /tmp/builder/generated ./generated

# public/: Static assets served by Next.js
COPY --from=builder --chown=65532 /tmp/builder/public ./public

# .next/standalone: Minified Next.js application
COPY --from=builder --chown=65532 /tmp/builder/.next/standalone ./

# .next/static: Precompiled static assets
COPY --from=builder --chown=65532 /tmp/builder/.next/static ./.next/static

# Run as non-root user for security
USER 65532

# Expose application port
EXPOSE 3000

# Start the application server
ENTRYPOINT ["bun", "run", "server.js"]
