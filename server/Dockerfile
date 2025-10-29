# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci --omit=dev || npm ci

# Copy source
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Start command: try dist first, then common fallbacks
CMD ["sh", "-c", "node dist/server.js || node dist/index.js || node src/server.js || node src/index.js || node index.js"]
