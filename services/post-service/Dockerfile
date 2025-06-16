# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY src/ ./src/

# Copy environment example
COPY .env.example ./

# Expose service port
ENV PORT=3000
EXPOSE 3000

# Run the service
CMD ["node", "src/app.js"]