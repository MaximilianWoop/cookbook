# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

# start app
CMD ["npm", "run", "serve"]

#docker build -t my-app:dev .
#docker run -v ${PWD}:/app -v /app/node_modules -p 8081:8080 --rm my-app:dev
#docker save -o image my-app 
