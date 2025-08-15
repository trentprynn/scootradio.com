.PHONY: save-deps outdated install start lint create-migration migrate migrate-down seed

save-deps:
	poetry lock && poetry install --sync

outdated:
	poetry show --outdated --top-level

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