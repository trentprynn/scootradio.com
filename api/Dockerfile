# base image  
FROM python:3.10

# On Railway, to access environment variables during container build, you must declare them as arguments
# Reference: https://docs.railway.app/deploy/dockerfiles
ARG PGDATABASE
ARG PGUSER
ARG PGPASSWORD
ARG PGHOST
ARG PGPORT

# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  



# install dependencies  
RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . $DockerHOME  
# run this command to install all dependencies  
RUN pip install -r requirements.txt  

# port where the Django app runs  
EXPOSE 8000  
# start server  
CMD python manage.py migrate && python manage.py loaddata ./src/seed/radio_stations.json && python manage.py runserver 0.0.0.0:8000