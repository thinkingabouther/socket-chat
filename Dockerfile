FROM node:12-alpine

ADD ./server/yarn.lock ./server/package.json server/
WORKDIR server
RUN yarn install
ADD ./client/yarn.lock ./client/package.json client/
RUN cd ./client && yarn

COPY . .
RUN cd ./client && yarn build
ENV PROD=true
WORKDIR server
CMD ["npm", "start"]
