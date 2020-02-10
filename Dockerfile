FROM node
WORKDIR /chico
RUN git config --global http.proxy http://200.198.51.238:8080
RUN git config --global https.proxy http://200.198.51.238:8080
RUN npm config set proxy "http://200.198.51.238:8080/"
COPY package.json . 
RUN apt-get update && apt-get install nodejs -y 
RUN apt-get install npm -y 
RUN npm install 
COPY index.js . 
COPY erro.js . 
ENTRYPOINT node server.js 
