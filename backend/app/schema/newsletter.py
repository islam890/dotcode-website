from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr


class NewsletterSubscriptionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    created_at: datetime
    already_subscribed: bool = False
    message: str
