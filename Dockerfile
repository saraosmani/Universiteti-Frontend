# Use Node 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]