# Use an official Nginx runtime as a parent image
FROM nginx

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Install Nest.js
RUN npm install -g @nestjs/cli

# Install the dependencies
RUN npm install

# Build the app
RUN npm run build

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
