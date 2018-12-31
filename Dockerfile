FROM node
RUN npm install npm@latest \
 && rm -rf /usr/local/lib/node_modules/npm \
 && mv node_modules/npm /usr/local/lib/node_modules/npm
# ADD GLOBAL PACKAGES
RUN npm install -g --unsafe-perm pm2
