FROM node:16.18.0 as builder

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --force

COPY . .

RUN yarn build

FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000 80

CMD ["nginx", "-g", "daemon off;"]
