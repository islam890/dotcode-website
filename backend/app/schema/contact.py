from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# --- Contact Message Schemas
class ContactMessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    phone: str | None
    company: str | None
    project_type: str | None
    budget: str | None
    message: str
    status: Literal["NEW", "READ", "REPLIED", "ARCHIVED"]
    created_at: datetime
    updated_at: datetime


# --- Contact Message Create Schema
class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)
    company: str | None = Field(default=None, max_length=150)
    project_type: str | None = Field(default=None, max_length=100)
    budget: str | None = Field(default=None, max_length=100)
    message: str = Field(min_length=10, max_length=5000)


# --- Contact Message Update Schema
class ContactMessageUpdate(BaseModel):
    status: Literal["NEW", "READ", "REPLIED", "ARCHIVED"] | None = None