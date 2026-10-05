from pydantic import BaseModel, ConfigDict


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
