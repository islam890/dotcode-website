from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Testimonial
from app.schema.testimonials import TestimonialResponse


router = APIRouter(
    prefix="/testimonials",
    tags=["testimonials"]
)


# --- Get all testimonials
@router.get("/", response_model=list[TestimonialResponse])
def get_all_testimonials(db: Session = Depends(get_db)):
    testimonials = (
        db.query(Testimonial)
        .filter(Testimonial.published.is_(True))
        .order_by(Testimonial.created_at.desc(), Testimonial.id.desc())
        .all()
    )

    return testimonials


# --- Get a testimonial by id
@router.get("/{id}", response_model=TestimonialResponse)
def get_testimonial(id: int, db: Session = Depends(get_db)):
    testimonial = db.query(Testimonial).filter(
        Testimonial.id == id,
        Testimonial.published.is_(True),
    ).first()

    if not testimonial:
        raise HTTPException(
            status_code=404,
            detail="Testimonial not found."
        )

    return testimonial
