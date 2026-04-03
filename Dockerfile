FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate
RUN chmod +x docker/start.sh

EXPOSE 3000

CMD ["sh", "docker/start.sh"]
