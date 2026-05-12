# ── Stage 1: Build ──
FROM node:24-slim AS build

# Install pnpm 11
RUN npm install -g pnpm@11.0.8

WORKDIR /app

# Copy lockfile and package.json
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --dangerously-allow-all-builds

# Copy source and build the SSR app
COPY . .
RUN pnpm run build

# ── Stage 2: Runtime ──
FROM node:24-slim

WORKDIR /app

# Copy the build output
COPY --from=build /app/dist/show-off /app/dist/show-off

EXPOSE 4000
ENV NODE_ENV=production

# Start the SSR server
CMD ["node", "dist/show-off/server/server.mjs"]
