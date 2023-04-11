FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build
