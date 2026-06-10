FROM node:${{ values.nodeVersion | replace('.x', '') }}-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# prebuild generates src/api/types.ts, tsc compiles, postbuild copies spec to dist/api/
RUN npm run build

FROM node:${{ values.nodeVersion | replace('.x', '') }}-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE ${{ values.port }}
CMD ["npm", "run", "start"]
