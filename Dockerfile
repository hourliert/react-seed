FROM node:5.4
MAINTAINER Thomas Hourlier <hourliert@gmail.com>
EXPOSE 5000

RUN useradd -m -d /app -s /bin/bash react
WORKDIR /app
ADD . /app
RUN chown -R react:react /app

USER react

RUN npm install --loglevel warn && npm run build -- --release --isomorphic

RUN rm -rf ./src ./tasks

CMD node ./build/server.js
