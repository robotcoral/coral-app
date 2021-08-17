FROM trion/ng-cli as builder
WORKDIR /app
COPY package.json package.json
RUN npm ci  --debug 
COPY . .
RUN ng build --prod

FROM nginx:1.20.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder dist/carol-site /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
