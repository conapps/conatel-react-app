
####### 1st build step
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

####### 2nd build step

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the nginx.conf 
COPY nginx.conf /etc/nginx/conf.d/default.conf
