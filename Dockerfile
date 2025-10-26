# Multi-stage build for SHOPPER e-commerce application

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Copy frontend package files
COPY package*.json ./
RUN npm ci --only=production

# Copy frontend source
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Setup backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/server

# Copy backend package files
COPY server/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY server/ .

# Stage 3: Final production image
FROM node:18-alpine AS production
WORKDIR /app

# Install pm2 for process management
RUN npm install -g pm2

# Copy backend from builder
COPY --from=backend-builder /app/server ./server

# Copy frontend build from builder
COPY --from=frontend-builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# Change ownership
RUN chown -R appuser:nodejs /app
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api || exit 1

# Start the application
CMD ["pm2-runtime", "start", "server/index.js", "--name", "shopper-backend"]
