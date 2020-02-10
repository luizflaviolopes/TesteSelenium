FROM node:lts
WORKDIR /chico
COPY package.json . 
RUN apt-get update && apt-get install nodejs -y 
RUN apt-get install npm -y 
RUN npm install 
COPY index.js . 
COPY erro.js . 
ENTRYPOINT node server.js 
