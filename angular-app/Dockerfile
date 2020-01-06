FROM node:12 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.16.1-alpine

COPY --from=build /usr/src/app/dist/angular-app /usr/share/nginx/html
