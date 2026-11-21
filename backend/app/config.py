from pathlib import Path
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DB_FILE = BASE_DIR / "portfolio.db"


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = f"sqlite:///{DEFAULT_DB_FILE.as_posix()}"
    
    # Email configuration (Resend)
    RESEND_API_KEY: str = ""
    NOTIFICATION_EMAIL: str = "anjali13anuj@gmail.com"
    SENDER_EMAIL: str = "Portfolio Contact <onboarding@resend.dev>"
    
    # CORS settings
    ALLOWED_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]
    
    # Rate limits
    CONTACT_RATE_LIMIT: str = "5/minute"
    ANALYTICS_RATE_LIMIT: str = "120/minute"

    @field_validator("DATABASE_URL", mode="before")
    def fix_database_url(cls, v: str) -> str:
        if isinstance(v, str) and v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql://", 1)
        return v

    @field_validator("ALLOWED_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return ["*"]

    model_config = SettingsConfigDict(
        env_file=(str(BASE_DIR / ".env"), str(BASE_DIR.parent / ".env"), ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
