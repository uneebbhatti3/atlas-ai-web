# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps

WORKDIR /app

# Install libc compatibility for Alpine
RUN apk add --no-cache libc6-compat

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci


# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production

# Build Next.js
RUN npm run build


# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy standalone Next.js application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Run as non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]