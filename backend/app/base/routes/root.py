import datetime
from app.base.dtos.health_check import HealthCheckDTO
from fastapi import APIRouter, status

from fastapi.responses import RedirectResponse, PlainTextResponse

router = APIRouter(
    prefix="",
    tags=["root"],
    dependencies=[],
)


@router.get("/health")
def health_check() -> HealthCheckDTO:
    return HealthCheckDTO(
        status="healthy",
        time=datetime.datetime.now().astimezone().isoformat(),
        timezone=datetime.datetime.now().astimezone().tzname(),
    )


@router.get(
    "/",
    response_class=RedirectResponse,
    status_code=status.HTTP_302_FOUND,
    summary="Root to docs redirect",
    description="This endpoint redirects the root path of the API to the documentation.",
    include_in_schema=False,
)
def root_to_docs_redirect():
    """
    Redirects to the API documentation.

    Returns:
        RedirectResponse: A redirect response object that redirects to /docs.
    """
    return RedirectResponse(url="/docs")


@router.get("/robots.txt", response_class=PlainTextResponse, include_in_schema=False)
def robots():
    data = """User-agent: *\nDisallow: /"""
    return data
