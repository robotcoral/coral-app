FROM nginx:1.20.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/coral-site /usr/share/nginx/html
