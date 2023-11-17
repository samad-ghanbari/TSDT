FROM ubuntu:22.04
MAINTAINER ghanbari <ghanbari.samad@gmail.com>

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
RUN npm install -g create-react-app
RUN npm install -g create-next-app

RUN mkdir -p /var/www/html/Backend
RUN chmod 775 /var/www/html/Backend
RUN chown root:www-data /var/www/html/Backend

RUN mkdir -p /var/www/html/Frontend
RUN chmod 775 /var/www/html/Frontend
RUN chown root:www-data /var/www/html/Frontend

EXPOSE 80

# sudo docker build -t nodev . # node-express-next-react
# sudo docker run --rm -it --network=host  -v /home/samad/share/programs/www/TSDT/:/var/www/html/  nodev bash

