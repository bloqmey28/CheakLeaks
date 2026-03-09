
# Stage 1: Build & Install Dependencies
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production

# Stage 2: Runtime Environment
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Set permissions
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 4000

CMD ["node", "index.js"]
