FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm i
ENV PORT=3001
CMD ["npm", "start"]
