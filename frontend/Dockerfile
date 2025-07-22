# ===================================
# STAGE 1: Build React Application
# ===================================
FROM node:18.17.1 AS react-build
WORKDIR /react

# Copy only the necessary files
COPY package*.json \
    craco.config.js \
    .env ./
COPY .env.docker ./.env.production
COPY src ./src
COPY public ./public

# Install dependencies and build the application
RUN npm install --legacy-peer-deps
RUN npm install ajv
RUN npm run build

# ================================
# STAGE 2: Run Nginx Server
# ================================
FROM nginx:stable-alpine

# Copy the built project into the Nginx container
COPY --from=react-build /react/build /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]