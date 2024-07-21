FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code and Webpack configuration files
COPY src ./src
COPY public ./public
COPY webpack.common.js webpack.prod.js ./

# Build the React app
RUN npm run build


FROM node:16
WORKDIR /app

COPY --from=builder /app/dist ./build

# Install `serve`
RUN npm install -g serve

# Set the command to serve the build output
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
