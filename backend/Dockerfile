FROM python:3.11 as deps

WORKDIR /deps

RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock* /deps/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.11

WORKDIR /app

COPY --from=deps /deps/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./alembic.ini /app/

COPY ./scripts /app/scripts

COPY ./app /app/app

CMD export PORT="${PORT:-8000}" && uvicorn "app.main:app" --host "0.0.0.0" --port "$PORT"