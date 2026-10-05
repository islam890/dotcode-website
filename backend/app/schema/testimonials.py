from pydantic import BaseModel, ConfigDict, HttpUrl


class TestimonialResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    client_name: str
    client_role: str | None
    company_name: str | None
    content: str
    avatar_url: HttpUrl | None
    published: bool
