from app.dtos.health_check import HealthCheckDTO
from fastapi import APIRouter
from datetime import datetime

router = APIRouter(
    prefix="/health",
    tags=["health"],
    dependencies=[],
)


@router.get("")
def health_check() -> HealthCheckDTO:
    return HealthCheckDTO(
        status="healthy",
        time=datetime.now().astimezone().isoformat(),
        timezone=datetime.now().astimezone().tzname(),
    )
