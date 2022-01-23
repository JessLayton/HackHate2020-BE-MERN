FROM node:16

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm ci --silent

CMD [ "node", "app.js" ]