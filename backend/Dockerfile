FROM python:3.13.6 AS deps

WORKDIR /deps

RUN pip install poetry==1.8.5
COPY ./pyproject.toml ./poetry.lock* /deps/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.13.6 AS runner

WORKDIR /api

ENV PYTHONPATH=/api

COPY --from=deps /deps/requirements.txt /api/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

COPY ./alembic.ini /api/
COPY ./scripts /api/scripts
COPY ./static /api/static
COPY ./app /api/app

CMD ["python", "/api/scripts/start.py"]

HEALTHCHECK --interval=5s --timeout=3s --retries=10 --start-period=5s CMD \
  wget -qO- http://localhost:8000/health || exit 1