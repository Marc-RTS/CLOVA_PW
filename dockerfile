# Get the base image of Node version
FROM node:20

# Get the latest version of Playwright
FROM  mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# Copy test code
COPY package.json /app/
COPY tests/ /app/tests/
COPY playwright.config.ts /app/
COPY .env /app/

EXPOSE 9222

# Install dependencies
RUN npx -y playwright@1.43.1 install --with-deps
RUN npx playwright install msedge
RUN npm install
