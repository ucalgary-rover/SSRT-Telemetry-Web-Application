# Container dependencies:
# Node.js 22

# Use a base image with Node.js
FROM node:22

# Create and define the application's working directory.
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Expose the port Vite uses
EXPOSE 4000

# Run development build of application
CMD ["npm", "run", "dev"]
