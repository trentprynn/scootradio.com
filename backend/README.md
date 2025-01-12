## Useful commands
- Create DB `docker run --name scoot-radio-db -e POSTGRES_USER=scoot-radio-user -e POSTGRES_PASSWORD=scoot-radio-pass -e POSTGRES_DB=scoot-radio -p 5432:5432 -v scoot-radio-db-data:/var/lib/postgresql/data -d postgres:15`
- Create Redis `docker run --name scoot-radio-redis -p 6379:6379  -v scoot-radio-redis-data:/data -d redis:7`
- Create `.env` file with necessary entries (`cp .env.sample .env`)
- Run App `make start`
    - installs dependencies
    - runs migrations
    - inserts basic seed data
- Create a migration `make create-migration`
- Run in migrations `make migrate`
- Run seed `make seed`
- Lint and Format `make lint` 


## Docker container
- `docker build . -t api.scootradio.com`
- `docker run -d --name api.scootradio.com --env-file .env -p 8000:8000 api.scootradio.com`
- `docker stop api.scootradio.com`
- `docker rm api.scootradio.com`
- `docker rmi api.scootradio.com`
