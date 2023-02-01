#############
### build ###
#############

# base image
FROM node:alpine AS builder
ARG env=production

# install jq to get version
RUN apk add jq

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli

# add app
COPY . /app

# generate build
RUN ng build --configuration=$env --output-path=dist --aot --output-hashing=all

# Create Version files
RUN echo "$(jq -r '.version' package.json)" > version.txt
RUN echo "{\"version\":\"$(jq -r '.version' package.json)\"}" > version.json
RUN echo "[{\"version\":\"$(jq -r '.version' package.json)\"}]" > version_motor.json

############
### prod ###
############

# base image
FROM nginx:latest
ARG port=8080
ARG env=production

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist /usr/share/nginx/html

# copy version files
COPY --from=builder /app/version.txt /usr/share/nginx/version/version.txt
COPY --from=builder /app/version.json /usr/share/nginx/version/version.json
COPY --from=builder /app/version_motor.json /usr/share/nginx/version/version_motor.json

# copy nginx conf
COPY nginx.$env.conf /etc/nginx/conf.d/nginx.conf

# expose port 8080
EXPOSE $port
