FROM node:16

RUN apt-get update -y && apt-get upgrade -y && apt-get -y install curl python build-essential git ca-certificates

ENV DEBUG="server:*"
ENV PORT="1337"
ENV BASE_URL="https://swapi.py4e.com/api/films/"

RUN mkdir -p /metacare /metacare/config

FROM node:14

RUN apt-get update -y && apt-get upgrade -y && apt-get -y install curl python build-essential git ca-certificates

ENV DEBUG="server:*"
ENV PORT="1337"
ENV BASE_URL="https://swapi.py4e.com/api/films/"

RUN mkdir -p /metacare /metacare/config /metacare/constants /metacare/controllers /metacare/models /metacare/services /metacare/utils
COPY config/*.js /metacare/config/
COPY constants/*.js /metacare/constants/
COPY controllers/*.js /metacare/controllers/
COPY models/*.js /metacare/models/
COPY services/*.js /metacare/services/
COPY utils/*.js /metacare/utils/
COPY *js package.json /metacare/

WORKDIR /metacare

RUN npm install --unsafe-perm

EXPOSE 1337
CMD [ "node", "./server.js" ]
