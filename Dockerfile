#############
### build ###
#############

# base image
FROM node:alpine AS builder


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli@9.1.8

# add app
COPY . /app

# generate build
RUN ng build --configuration=production --output-path=dist


############
### prod ###
############

# base image
FROM nginx:latest

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist /usr/share/nginx/html

# copy nginx conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# expose port 8080
EXPOSE 8080
