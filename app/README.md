# scootradio.com
Repository for the source code of scootradio.com

## Run and develop locally
1. clone the repository
2. navigate into it 
3. run `yarn`
    - installs dependencies
4. setup `.env` file with expected values (`cp .env.sample .env`)
5. run `yarn dev`
    - runs application with hot reloading enabled

## Deployment
- On a push to master the website will be deployed automatically by Railway
- The following commands can be used to locally build and run the Dockerfile that will be deployed
    - build image: `docker build . -t scootradio.com`
    - create container: `docker run -d --name scootradio.com --env-file .env -p 3000:3000  scootradio.com`
    - stop container: `docker stop scootradio.com`
    - delete container: `docker rm scootradio.com`
    - delete image: `docker rmi scootradio.com`
