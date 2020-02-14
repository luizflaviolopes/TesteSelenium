FROM selenium/node-chrome
WORKDIR /chico
#RUN npm config set proxy "http://200.198.51.238:8080/"
COPY package.json . 
#RUN npm install 
COPY index.js . 
COPY erro.js . 
ENTRYPOINT node index.js 
