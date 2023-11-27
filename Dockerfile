FROM ubuntu:22.04
#357M
LABEL MAINTAINER="ghanbari <ghanbari.samad@gmail.com>"

# Installing packages
RUN apt update 
RUN apt upgrade -y
RUN apt clean


# move Node package to container
RUN mkdir /opt/nodejs/
RUN chmod 775 /opt/nodejs/
COPY ./nodejs /opt/nodejs
ENV PATH="/opt/nodejs/bin:$PATH" 

RUN npm install -g nodemon express-generator 
#RUN npm install -g create-react-app
RUN npm install -g create-next-app
RUN npm install -g pg pg-hstore sequelize-auto

RUN mkdir -p /var/www/html/backend
RUN chmod 775 /var/www/html/backend
RUN chown root:www-data /var/www/html/backend

RUN mkdir -p /var/www/html/ui
RUN chmod 775 /var/www/html/ui
RUN chown root:www-data /var/www/html/ui

EXPOSE 80

# sudo docker build -t nodev . # node-express-next-react
# sudo docker run --rm -it --network=host  -v /home/samad/share/programs/www/TSDT/:/var/www/html/  nodev bash

