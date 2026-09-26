from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactMessage, Admin
from app.schemas.contact import (
    ContactMessageCreate,
    ContactMessageUpdate,
    ContactMessageResponse
)
from app.api.v1.dependencies import get_current_admin
from app.core.limiter import limiter

router = APIRouter(
    prefix="/contact",
    tags=["contact"]
)


# --- Get all contact messages
@router.get("/", response_model=list[ContactMessageResponse])
def get_all_contact_messages(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    contact_messages = db.query(ContactMessage).order_by(
        ContactMessage.created_at.desc()
    ).all()

    return contact_messages


# --- Get a contact message by id
@router.get("/{id}", response_model=ContactMessageResponse)
def get_contact_message(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    contact_message = db.query(ContactMessage).filter(
        ContactMessage.id == id
    ).first()

    if not contact_message:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found."
        )

    return contact_message


# --- Create a new contact message
@router.post("/", response_model=ContactMessageResponse, status_code=201)
@limiter.limit("5/minute")
def create_contact_message(
    request: Request,
    contact_message_data: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    contact_message = ContactMessage(
        **contact_message_data.model_dump()
    )

    db.add(contact_message)
    db.commit()
    db.refresh(contact_message)

    return contact_message


# --- Update an existing contact message
@router.patch("/{id}", response_model=ContactMessageResponse)
def update_contact_message(
    id: int,
    contact_message_data: ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    contact_message = db.query(ContactMessage).filter(
        ContactMessage.id == id
    ).first()

    if not contact_message:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found."
        )

    update_data = contact_message_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(contact_message, key, value)

    db.commit()
    db.refresh(contact_message)

    return contact_message


# --- Delete a contact message
@router.delete("/{id}", status_code=204)
def delete_contact_message(
    id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    contact_message = db.query(ContactMessage).filter(
        ContactMessage.id == id
    ).first()

    if not contact_message:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found."
        )

    db.delete(contact_message)
    db.commit()

    return