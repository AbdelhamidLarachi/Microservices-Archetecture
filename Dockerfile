FROM node:12
WORKDIR /home/node/controller
COPY controller /home/node/controller
RUN npm install
CMD npm run controller