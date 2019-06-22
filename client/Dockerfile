FROM node:12.2.0-alpine as build

RUN mkdir -p /home/node/bpmclient/node_modules && chown -R node:node /home/node/bpmclient

WORKDIR /home/node/bpmclient

COPY package*.json ./

RUN npm install --silent

RUN npm install react-scripts@3.0.1 -g --silent

COPY --chown=node:node . .

RUN npm run build


FROM node:12.2.0-alpine

RUN npm install -g serve

WORKDIR /home/node/bpmclient

COPY --from=build /home/node/bpmclient/build .

EXPOSE 5000

CMD ["serve", "-p", "5000", "-s", "."]
