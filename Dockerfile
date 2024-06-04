# Base image with Node.js environment
FROM node:16-alpine

# Working directory within the container
WORKDIR /app

# Copy your package.json file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application code
COPY . .

# Expose the port your Express server listens on
EXPOSE 3000

# Start the server process (replace "index.js" with your main app file)
CMD [ "npm", "run", "start" ]
