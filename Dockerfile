# Use an official Node.js runtime as a parent image
FROM node:14 as builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built NestJS application from the previous build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
