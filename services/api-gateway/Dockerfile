FROM node:12.8.1

RUN apt-get update && apt-get install -y vim

COPY . /app/

WORKDIR /app

RUN npm install
