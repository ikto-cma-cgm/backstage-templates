{% if values.nodeVersion === '18' -%}
FROM node:18-alpine
{%- endif %}
{% if values.nodeVersion === '20' -%}
FROM node:20-alpine
{%- endif %}
{% if values.nodeVersion === '22' -%}
FROM node:22-alpine
{%- endif %}
MAINTAINER cma

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

ENV NODE_ENV production
ENV PORT 3000

EXPOSE ${PORT}

ENTRYPOINT [ "node", "dist/index.js" ]
