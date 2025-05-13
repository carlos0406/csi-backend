# Stage 1: Build stage
FROM node:20.17.0-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@8.15.1

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy application source
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Production stage
FROM node:20.17.0-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.1

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN pnpm install --prod

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start:prod"]# Stage 1: Build stage
FROM node:20.17.0-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@8.15.1

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy application source
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Production stage
FROM node:20.17.0-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.1

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN pnpm install --prod

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start:prod"]