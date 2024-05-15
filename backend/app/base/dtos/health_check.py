from typing import Optional
from pydantic import BaseModel


class HealthCheckDTO(BaseModel):
    status: str
    time: str
    timezone: Optional[str]
