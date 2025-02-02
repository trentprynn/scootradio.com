import structlog
import traceback
from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from fastapi.responses import JSONResponse
from scripts.wait_db import wait_db
from scripts.migrate import migrate
from scripts.seed import seed


log = structlog.get_logger()


@asynccontextmanager
async def lifespan(_: FastAPI):
    """
    An asynchronous context manager for the lifespan of the FastAPI application.
    """
    # startup events
    log.info("FastAPI application starting up")

    await wait_db()
    migrate()
    await seed()

    log.info("FastAPI application startup complete")

    yield

    # shutdown events
    log.info("FastAPI application shutting down")


async def exception_handler(_: Request, exc: Exception):
    """
    Asynchronous exception handler for the FastAPI application.
    """
    log.error(f"An error occurred: {exc}")
    log.error(traceback.format_exc())

    return JSONResponse(
        status_code=500,
        content={"message": "An error occurred."},
    )
