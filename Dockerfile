FROM node

WORKDIR /usr/src/app
COPY ./server/package*.json ./

RUN npm install

COPY ./server ./

CMD ["node", "index.js"]

WORKDIR /client
COPY ./server/client/package*.json ./

RUN npm install

COPY ./server/client ./

CMD ["npm", "start"]