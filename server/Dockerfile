# Base image
FROM node:20-bullseye-slim

# Create app directory
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install dependencies first
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy source
COPY . .
RUN npx prisma generate && npm run build

# Environment
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Start command: try dist first, then common fallbacks
CMD ["sh", "-c", "npx prisma migrate deploy || npx prisma db push; node dist/index.js"]
