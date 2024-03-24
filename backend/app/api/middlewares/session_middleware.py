from collections.abc import Generator
from typing import Annotated
from sqlalchemy.orm import Session

from fastapi import Depends

from app.core.db import engine


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionMiddleware = Annotated[Session, Depends(get_db)]
