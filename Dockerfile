FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci --silent

# Bundle app source
COPY . .

CMD [ "node", "app.js" ]