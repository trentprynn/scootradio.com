from typing import Annotated, Generator
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.db import engine


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
