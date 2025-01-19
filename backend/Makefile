.PHONY: save-deps install start lint create-migration migrate migrate-down seed

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

migrate-down: install
	poetry run migrate-down

seed: install
	poetry run seed