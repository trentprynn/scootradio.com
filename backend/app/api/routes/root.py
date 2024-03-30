from fastapi import APIRouter, status

from fastapi.responses import RedirectResponse

router = APIRouter(
    prefix="",
    tags=["root"],
    dependencies=[],
)


@router.get(
    "/",
    response_class=RedirectResponse,
    status_code=status.HTTP_302_FOUND,
    summary="Root to docs redirect",
    description="This endpoint redirects the root path of the API to the documentation.",
)
def root_to_docs_redirect():
    """
    Redirects to the API documentation.

    Returns:
        RedirectResponse: A redirect response object that redirects to /docs.
    """
    return RedirectResponse(url="/docs")
