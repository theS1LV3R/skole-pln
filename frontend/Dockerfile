FROM node:16

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

RUN rm -rf components layouts pages static store types tsconfig.json node_modules

RUN yarn install --production --frozen-lockfile

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD [ "curl", "localhost:3000" ]

CMD ["yarn", "start"]
