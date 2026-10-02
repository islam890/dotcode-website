from pydantic import BaseModel, ConfigDict, Field, HttpUrl
from datetime import datetime

# --- Project Schemas
class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    short_description: str
    description: str
    category: str
    client_name: str | None
    # Stored rows may contain legacy values; keep GET responses serializable.
    project_url: str | None
    github_url: str | None
    featured: bool
    published: bool
    created_at: datetime
    updated_at: datetime

# --- Project Create
class ProjectCreate(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    slug: str = Field(min_length=2, max_length=180)
    short_description: str = Field(min_length=10, max_length=300)
    description: str = Field(min_length=10)
    category: str = Field(min_length=2, max_length=100)
    client_name: str | None = Field(default=None, min_length=None, max_length=150)
    project_url: HttpUrl | None = None
    github_url: HttpUrl | None = None
    featured: bool = False
    published: bool = True

# --- Project Update
class ProjectUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=150)
    slug: str | None = Field(default=None, min_length=2, max_length=180)
    short_description: str | None = Field(default=None, min_length=10, max_length=300)
    description: str | None = Field(default=None, min_length=10)
    category: str | None = Field(default=None, min_length=2, max_length=100)
    client_name: str | None = Field(default=None, min_length=None, max_length=150)
    project_url: HttpUrl | None = None
    github_url: HttpUrl | None = None
    featured: bool | None = None
    published: bool | None = None
