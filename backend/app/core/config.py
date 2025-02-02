from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )

    ENVIRONMENT: Literal["development", "production"]

    PORT: int = 8000
    API_BASE_URL: str

    DATABASE_URL: str
    REDIS_URL: str

    @property
    def async_database_url(self) -> str:
        """
        Returns a modified version of DATABASE_URL that includes '+asyncpg'
        for asynchronous PostgreSQL support.
        """
        if "+asyncpg" in self.DATABASE_URL:
            return self.DATABASE_URL
        return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)


settings = Settings()
