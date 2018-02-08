FROM AutomationFoodMe

MAINTAINER your_email_address

# 1.
WORKDIR /AutomationFoodMe
ADD package.json /AutomationFoodMe/package.json
RUN apt-get update
RUN apt-get install -y nginx

WORKDIR /AutomationFoodMe
# 2.

ADD . /AutomationFoodMe

EXPOSE 9000

CMD [ "npm", "install" ]
CMD [ "npm", "run", 'upwd' ]
CMD [ "npm", "run", 'wd' ]
CMD [ "npm", "test" ]