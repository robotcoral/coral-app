FROM trion/ng-cli as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci  --debug --no-optional
COPY . ./
RUN ng build --outputPath=./dist/out --prod

FROM nginx:1.20.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder app/dist/out /usr/share/nginx/html
