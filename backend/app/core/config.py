from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Diploma Verification API"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/diploma_db"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
