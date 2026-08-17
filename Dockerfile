FROM --platform=linux/amd64 node:22-slim

WORKDIR /usr/src/app

ADD . .

RUN npm ci --legacy-peer-deps

RUN npm run build

CMD ["node", "dist/main.js"]
