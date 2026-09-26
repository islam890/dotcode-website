from pydantic import BaseModel, ConfigDict, Field, HttpUrl


# --- Testimonial Schemas
class TestimonialResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    client_name: str
    client_role: str | None
    company_name: str | None
    content: str
    avatar_url: HttpUrl | None
    published: bool


# --- Testimonial Create
class TestimonialCreate(BaseModel):
    client_name: str = Field(min_length=2, max_length=150)
    client_role: str | None = Field(default=None, max_length=150)
    company_name: str | None = Field(default=None, max_length=150)
    content: str = Field(min_length=10)
    avatar_url: HttpUrl | None = None
    published: bool = True


# --- Testimonial Update
class TestimonialUpdate(BaseModel):
    client_name: str | None = Field(default=None, min_length=2, max_length=150)
    client_role: str | None = Field(default=None, max_length=150)
    company_name: str | None = Field(default=None, max_length=150)
    content: str | None = Field(default=None, min_length=10)
    avatar_url: HttpUrl | None = None
    published: bool | None = None