FROM node:current-alpine AS build
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npx tsc

FROM nginx:alpine AS final
COPY --chown=nginx --from=build /app/build /usr/share/nginx/html
WORKDIR /etc/nginx/conf.d
ARG NODE_PORT
RUN rm -rf default.conf && \
    touch default.conf && \
    printf "server {\n" >> default.conf && \
    printf "  listen 80;\n" >> default.conf && \
    printf "  listen [::]:80;\n" >> default.conf && \
    printf "  root /usr/share/nginx/html;\n" >> default.conf && \
    printf "  location / {\n" >> default.conf && \
    printf "    proxy_pass http://localhost:%s;\n" "${NODE_PORT}" >> default.conf && \
    printf "    proxy_set_header Upgrade $http_upgrade;\n" >> default.conf && \
    printf "    proxy_set_header Connection 'upgrade';\n" >> default.conf && \
    printf "    proxy_set_header Host $host;\n" >> default.conf && \
    printf "    proxy_cache_bypass $http_upgrade;\n" >> default.conf && \
    printf "  }\n" >> default.conf && \
    printf "}" >> default.conf
    
EXPOSE 80
