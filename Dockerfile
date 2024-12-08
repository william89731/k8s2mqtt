FROM node:22-alpine as build
WORKDIR /k8s
RUN apk add --update curl --no-cache
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x ./kubectl \
    && mv ./kubectl /usr/local/bin/kubectl 
#RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
COPY package.json index.js  /k8s/
RUN npm install

FROM alpine:latest as final
COPY --from=build /k8s /k8s
COPY --from=build /usr/local/bin/kubectl /usr/local/bin/kubectl
WORKDIR /k8s
RUN apk add --update  npm  --no-cache
CMD npm start
