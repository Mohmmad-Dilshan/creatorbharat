# Stage 1: Build production assets
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
ARG VITE_API_URL
ARG VITE_ENV
ARG VITE_AUTH_MODE
ARG VITE_WEB3FORMS_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_ENV=$VITE_ENV \
    VITE_AUTH_MODE=$VITE_AUTH_MODE \
    VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
