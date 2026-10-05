from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    short_description: str
    description: str
    category: str
    client_name: str | None
    project_url: str | None
    github_url: str | None
    featured: bool
    published: bool
    created_at: datetime
    updated_at: datetime
