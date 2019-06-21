FROM node:12

RUN mkdir -p /home/node/blogplusminus/node_modules && chown -R node:node /home/node/blogplusminus

WORKDIR /home/node/blogplusminus

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]
