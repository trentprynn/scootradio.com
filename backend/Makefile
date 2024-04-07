.PHONY: save-deps install start lint prestart create-migration migrate seed

save-deps:
	poetry lock && poetry install --sync

install:
	poetry install --sync

start: install
	poetry run start

lint: install
	poetry run lint

create-migration: install
	poetry run create-migration

migrate: install
	poetry run migrate

seed: install
	poetry run seed