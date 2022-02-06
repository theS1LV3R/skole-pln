FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD [ "curl", "localhost:3001" ]

RUN rm -rf node_modules \
    && yarn install --production --frozen-lockfile

RUN rm -rf .editorconfig .eslintignore .eslintrc.json \
      .gitignore .nvmrc .prettierignore .prettierrc.json \
      .stylelintrc.json tailwind.config.js yarn.lock \
      renovate.json yarn-error.log yarn.log \
      README.md nest-cli.json LICENSE tsconfig.eslint.json \
      .env src

EXPOSE 3001

CMD ["yarn", "start"]
