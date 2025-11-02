# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# Use official nginx entrypoint templating: anything in /etc/nginx/templates/*.template
# will be env-substituted into /etc/nginx/conf.d on container start.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Default to internal Docker Compose service for local dev
ENV API_URL=http://server:5000

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
