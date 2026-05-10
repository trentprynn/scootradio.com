import time

import structlog
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response


log = structlog.get_logger()


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        started_at = time.perf_counter()

        response = await call_next(request)

        if request.url.path == "/health":
            return response

        duration_ms = round((time.perf_counter() - started_at) * 1000)
        log.info(
            f"{request.method} {request.url.path} {response.status_code}",
            method=request.method,
            path=request.url.path,
            status_code=response.status_code,
            duration_ms=duration_ms,
        )

        return response
