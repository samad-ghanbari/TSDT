#! /bin/bash

quietIds=$(docker ps -q)
if [ -n "$quietIds" ]
then 
docker stop $quietIds
fi

quietAll=$(docker ps -a -q)
if [ -n "$quietAll" ]
then 
docker rm $quietAll
fi
