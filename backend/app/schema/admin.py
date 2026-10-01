from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# --- Admin Schemas
class AdminResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: datetime


# --- Admin Create
class AdminCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


# --- Admin Update
class AdminUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=100)
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8, max_length=128)
    is_active: bool | None = None


# --- Admin Login
class AdminLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


# --- Admin Token
class TokenResponse(BaseModel):
    access_token: str
    token_type: str