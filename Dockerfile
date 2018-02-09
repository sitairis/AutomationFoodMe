FROM node:6.9.5

MAINTAINER Name <email.id@here>

WORKDIR /AutomationFoodMe

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6379

CMD [ "npm", "run", "upwd" ]
CMD [ "npm", "run", "wd" ]
CMD [ "npm", "test" ]