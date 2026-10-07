from pydantic_settings import BaseSettings
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


class Settings(BaseSettings):
    app_name: str
    app_env: str
    database_url: str
    database_password: str
    cors_origins: str = "http://localhost:3000"
    api_docs_enabled: bool = True

    contact_email: str | None = None
    email_from: str | None = None
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_use_tls: bool = True

    telegram_bot_token: str | None = None
    telegram_chat_id: str | None = None

    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60

    model_config = {
        "env_file": ".env"
    }

    @property
    def allowed_cors_origins(self) -> list[str]:
        origins = [
            origin.strip().rstrip("/")
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]

        if not origins:
            raise ValueError("CORS_ORIGINS must contain at least one origin.")

        if any("*" in origin for origin in origins):
            raise ValueError("CORS_ORIGINS must not contain wildcard origins.")

        return origins


settings = Settings()


engine = create_engine(
    settings.database_url,
    connect_args={
        "password": settings.database_password
    }
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


class Base(DeclarativeBase):
    pass