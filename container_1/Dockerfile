FROM node:alpine

RUN mkdir -p /usr/disha_PV_dir

WORKDIR /usr/disha_anand

COPY package.json /usr/disha_PV_dir

RUN npm install

COPY . /usr/disha_anand

CMD npm start