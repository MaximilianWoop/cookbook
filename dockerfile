# Create the container from the alpine linux image
FROM alpine:3.7

# Add nginx and nodejs
RUN apk add --update nginx nodejs

# Create the directories we will need
RUN mkdir -p /tmp/nginx/cookbook
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

# Copy the respective nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Set the directory we want to run the next commands for
WORKDIR /tmp/nginx/cookbook
# Copy our source code into the container
COPY . .
# Install the dependencies, can be commented out if you're running the same node version
RUN npm install

# run webpack and the vue-loader
RUN npm run build

# copy the built app to our served directory
RUN cp -r dist/* /var/www/html

# make all files belong to the nginx user
RUN chown nginx:nginx /var/www/html

# start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]


#docker build -t vue-docker-container .
#docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app

#package-lock.json - Zeile 11300
    # "vue-loader-v16": {
    #   "version": "npm:vue-loader@16.1.2",
    #   "resolved": "https://registry.npmjs.org/vue-loader/-/vue-loader-16.1.2.tgz",
    #   "integrity": "sha512-8QTxh+Fd+HB6fiL52iEVLKqE9N1JSlMXLR92Ijm6g8PZrwIxckgpqjPDWRP5TWxdiPaHR+alUWsnu1ShQOwt+Q==",
    #   "dev": true,
    #   "optional": true,
    #   "requires": {
    #     "chalk": "^4.1.0",
    #     "hash-sum": "^2.0.0",
    #     "loader-utils": "^2.0.0"
    #   },
    #   "dependencies": {
    #     "ansi-styles": {
    #       "version": "4.3.0",
    #       "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
    #       "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
    #       "dev": true,
    #       "optional": true,
    #       "requires": {
    #         "color-convert": "^2.0.1"
    #       }
    #     },
    #     "chalk": {
    #       "version": "4.1.0",
    #       "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.0.tgz",
    #       "integrity": "sha512-qwx12AxXe2Q5xQ43Ac//I6v5aXTipYrSESdOgzrN+9XjgEpyjpKuvSGaN4qE93f7TQTlerQQ8S+EQ0EyDoVL1A==",
    #       "dev": true,
    #       "optional": true,
    #       "requires": {
    #         "ansi-styles": "^4.1.0",
    #         "supports-color": "^7.1.0"
    #       }
    #     },
    #     "color-convert": {
    #       "version": "2.0.1",
    #       "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
    #       "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
    #       "dev": true,
    #       "optional": true,
    #       "requires": {
    #         "color-name": "~1.1.4"
    #       }
    #     },
    #     "color-name": {
    #       "version": "1.1.4",
    #       "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
    #       "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
    #       "dev": true,
    #       "optional": true
    #     },
    #     "has-flag": {
    #       "version": "4.0.0",
    #       "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
    #       "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
    #       "dev": true,
    #       "optional": true
    #     },
    #     "loader-utils": {
    #       "version": "2.0.0",
    #       "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-2.0.0.tgz",
    #       "integrity": "sha512-rP4F0h2RaWSvPEkD7BLDFQnvSf+nK+wr3ESUjNTyAGobqrijmW92zc+SO6d4p4B1wh7+B/Jg1mkQe5NYUEHtHQ==",
    #       "dev": true,
    #       "optional": true,
    #       "requires": {
    #         "big.js": "^5.2.2",
    #         "emojis-list": "^3.0.0",
    #         "json5": "^2.1.2"
    #       }
    #     },
    #     "supports-color": {
    #       "version": "7.2.0",
    #       "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
    #       "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
    #       "dev": true,
    #       "optional": true,
    #       "requires": {
    #         "has-flag": "^4.0.0"
    #       }
    #     }
    #   }
    # },