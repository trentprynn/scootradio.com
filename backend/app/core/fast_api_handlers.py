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

    This function handles startup and shutdown events of the application.
    On startup, it runs migration and seeding scripts.
    On shutdown, it simply logs a shutdown message.

    Args:
        _: FastAPI instance. It's not used in this function, hence the underscore.
    """
    # startup events
    log.info("FastAPI application starting up")

    wait_db()
    migrate()
    seed()

    yield

    # shutdown events
    log.info("shutting down")


async def exception_handler(_: Request, exc: Exception):
    """
    Asynchronous exception handler for the FastAPI application.

    This function logs the exception and returns a JSON response with a status code of 500.

    Args:
        _ (Request): The request that caused the exception. Unused in this function.
        exc (Exception): The exception that was raised.

    Returns:
        JSONResponse: A JSON response with a status code of 500 and a message indicating an error occurred.
    """
    log.error(f"An error occurred: {exc}")
    log.error(traceback.format_exc())

    return JSONResponse(
        status_code=500,
        content={"message": "An error occurred."},
    )
