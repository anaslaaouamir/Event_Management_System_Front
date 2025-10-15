FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm config set fetch-timeout 120000 && npm config set fetch-retries 5

RUN npm install


COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]