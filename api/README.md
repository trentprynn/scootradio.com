## Useful commands
- Create DB `docker run --name scoot-radio-db -e POSTGRES_USER=scoot-radio-user -e POSTGRES_PASSWORD=scoot-radio-pass -e POSTGRES_DB=scoot-radio -p 5432:5432 -v scoot-radio-data:/var/lib/postgresql/data -d postgres`
- Create `.env` file with necessary entries (`cp .env.sample .env`)
- Create virtual environment `python3 -m venv venv`
- Activate virtual environment `source ./venv/bin/activate`
- Install dependencies `python -m pip install -r requirements.txt`
- Run migrations `python manage.py migrate`
- Seed database `python manage.py loaddata ./src/seed/radio_stations.json`
- Run app `python manage.py runserver`
- Run formatting `black src/`


## Docker container
- `docker build . -t api.scootradio.com`
- `docker run -d --name api.scootradio.com --env-file .env -p 8000:8000  api.scootradio.com`
- `docker stop api.scootradio.com`
- `docker rm api.scootradio.com`
- `docker rmi api.scootradio.com`
