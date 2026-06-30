# Stage 1: Build dependency trees & generate Prisma clients
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++
COPY package*.json ./
COPY prisma ./prisma/
ENV DATABASE_URL="postgresql://mockuser:mockpass@localhost:5432/mockdb"
RUN npm ci --legacy-peer-deps
RUN npx prisma generate

# Stage 2: Production runtime image
FROM node:22-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]
