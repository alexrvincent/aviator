FROM nginx:mainline-alpine

# Install and update bash
RUN apk add --update bash

# Install add it to the runnables file
RUN mkdir -p /run/nginx

# Override the default nginx.conf with our own
COPY nginx.conf /etc/nginx/nginx.conf

# Copy our custom sites enabled to nginx's sites-enabled
# COPY sites-enabled/ /etc/nginx/sites-enabled

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80