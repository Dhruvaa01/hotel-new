# Use official Node.js image
FROM node:20.16.0



# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]

