FROM node:16.14-slim
WORKDIR /usr/src/app
COPY ./front/package*.json ./
RUN npm install && chown node -R node_modules
COPY ./front /usr/src/app/
EXPOSE 3000
EXPOSE 3001