from fastapi import APIRouter, Depends, Response
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.v1.dependencies import get_db
from app.database import settings
from app.models import NewsletterSubscriber
from app.schema.newsletter import (
    NewsletterSubscriptionCreate,
    NewsletterSubscriptionResponse,
)
from app.services.notifications import notify_newsletter_subscription

router = APIRouter(prefix="/newsletter", tags=["newsletter"])


@router.post(
    "/",
    response_model=NewsletterSubscriptionResponse,
    status_code=201,
)
def create_newsletter_subscription(
    response: Response,
    subscription_data: NewsletterSubscriptionCreate,
    db: Session = Depends(get_db),
):
    email = str(subscription_data.email).lower()
    subscriber = (
        db.query(NewsletterSubscriber)
        .filter(NewsletterSubscriber.email == email)
        .first()
    )
    if subscriber:
        response.status_code = 200
        return NewsletterSubscriptionResponse(
            id=subscriber.id,
            email=subscriber.email,
            created_at=subscriber.created_at,
            already_subscribed=True,
            message="You're already subscribed.",
        )

    subscriber = NewsletterSubscriber(email=email)
    db.add(subscriber)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        subscriber = (
            db.query(NewsletterSubscriber)
            .filter(NewsletterSubscriber.email == email)
            .first()
        )
        if subscriber is None:
            raise
        response.status_code = 200
        return NewsletterSubscriptionResponse(
            id=subscriber.id,
            email=subscriber.email,
            created_at=subscriber.created_at,
            already_subscribed=True,
            message="You're already subscribed.",
        )

    db.refresh(subscriber)
    notify_newsletter_subscription(subscriber.email, settings)

    return NewsletterSubscriptionResponse(
        id=subscriber.id,
        email=subscriber.email,
        created_at=subscriber.created_at,
        message="You're subscribed. Thanks for joining DotCode.",
    )
