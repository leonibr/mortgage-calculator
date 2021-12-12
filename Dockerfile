FROM node:16 as build
WORKDIR /app
ADD package*.json .
RUN npm install
ADD src/ src/
RUN npm run build

FROM nginx:latest as runner
COPY --from=build /app/dist/ /usr/share/nginx/html

