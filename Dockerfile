FROM node:20.5.1-alpine

WORKDIR /account

COPY . .
COPY .env.example .env

RUN npm cache clean --force
RUN npm install -g @nestjs/cli argon2 ts-node rimraf

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]