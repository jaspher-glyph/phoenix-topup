# Dockerfile

# base image
FROM node:alpine

# Install PM2 globally
RUN npm install --global pm2

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build

EXPOSE 3000
# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]