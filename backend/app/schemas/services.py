from pydantic import BaseModel, ConfigDict, Field


# --- Service Schemas
class ServiceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    short_description: str
    description: str
    featured: bool
    published: bool
    order: int


# --- Service Create
class ServiceCreate(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    slug: str = Field(min_length=2, max_length=180)
    short_description: str = Field(min_length=10, max_length=300)
    description: str = Field(min_length=10)
    featured: bool = False
    published: bool = True
    order: int = Field(default=0, ge=0)


# --- Service Update
class ServiceUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=150)
    slug: str | None = Field(default=None, min_length=2, max_length=180)
    short_description: str | None = Field(default=None, min_length=10, max_length=300)
    description: str | None = Field(default=None, min_length=10)
    featured: bool | None = None
    published: bool | None = None
    order: int | None = Field(default=None, ge=0)