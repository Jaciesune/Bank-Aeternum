FROM node:22-alpine3.18

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

RUN npm run build
CMD ["npm", "start"]