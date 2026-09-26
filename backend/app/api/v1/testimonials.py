from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Testimonial, Admin
from app.schemas.testimonials import (
    TestimonialCreate,
    TestimonialUpdate,
    TestimonialResponse
)
from app.api.v1.dependencies import get_current_admin


router = APIRouter(
    prefix="/testimonials",
    tags=["testimonials"]
)


# --- Get all testimonials
@router.get("/", response_model=list[TestimonialResponse])
def get_all_testimonials(db: Session = Depends(get_db)):
    testimonials = db.query(Testimonial).all()

    return testimonials


# --- Get a testimonial by id
@router.get("/{id}", response_model=TestimonialResponse)
def get_testimonial(id: int, db: Session = Depends(get_db)):
    testimonial = db.query(Testimonial).filter(
        Testimonial.id == id
    ).first()

    if not testimonial:
        raise HTTPException(
            status_code=404,
            detail="Testimonial not found."
        )

    return testimonial


# --- Create a new testimonial
@router.post("/", response_model=TestimonialResponse, status_code=201)
def create_testimonial(
    testimonial_data: TestimonialCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    testimonial = Testimonial(**testimonial_data.model_dump())

    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)

    return testimonial


# --- Update an existing testimonial
@router.patch("/{id}", response_model=TestimonialResponse)
def update_testimonial(
    id: int,
    testimonial_data: TestimonialUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    testimonial = db.query(Testimonial).filter(
        Testimonial.id == id
    ).first()

    if not testimonial:
        raise HTTPException(
            status_code=404,
            detail="Testimonial not found."
        )

    update_data = testimonial_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(testimonial, key, value)

    db.commit()
    db.refresh(testimonial)

    return testimonial


# --- Delete a testimonial
@router.delete("/{id}", status_code=204)
def delete_testimonial(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    testimonial = db.query(Testimonial).filter(
        Testimonial.id == id
    ).first()

    if not testimonial:
        raise HTTPException(
            status_code=404,
            detail="Testimonial not found."
        )

    db.delete(testimonial)
    db.commit()

    return