FROM selenium/node-chrome
WORKDIR /chico
USER root
RUN echo "Acquire {" >> /etc/apt/apt.conf.d/proxy.conf
RUN echo "HTTP::proxy \"http://200.198.51.238:8080\";" >> /etc/apt/apt.conf.d/proxy.conf
RUN echo "HTTPS::proxy \"http://200.198.51.238:8080\";" >> /etc/apt/apt.conf.d/proxy.conf
RUN echo "}" >> /etc/apt/apt.conf.d/proxy.conf
RUN cat /etc/apt/apt.conf.d/proxy.conf
RUN apt-get install npm -y
RUN npm config set proxy "http://200.198.51.238:8080/"
COPY package.json . 
RUN npm install 
COPY index.js . 
COPY erro.js . 
ENTRYPOINT node server.js 
