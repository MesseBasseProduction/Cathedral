FROM node:20-alpine

ARG ARG_PORT
ENV PORT=$ARG_PORT
ENV NODE_ENV=development

WORKDIR /frontend

RUN chown node:node /frontend && \
    mkdir -p /frontend/node_modules &&  \
    chown -R node:node /frontend

USER node
COPY --chown=node:node ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn --ignore-scripts

COPY --chown=node:node ./frontend .

CMD yarn start --host 0.0.0.0 --port $PORT
CMD ["yarn", "start", "--host=0.0.0.0"]