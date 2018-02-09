FROM node:6.9.5

MAINTAINER Name <email.id@here>

WORKDIR /AutomationFoodMe

COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 6379

CMD [ "webdriver-manager", "update" ]
CMD [ "webdriver-manager", "start" ]
CMD [ "npm", "test" ]