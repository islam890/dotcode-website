from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Service, Admin
from app.schema.services import (
    ServiceCreate,
    ServiceUpdate,
    ServiceResponse
)
from app.api.v1.dependencies import get_current_admin

router = APIRouter(
    prefix="/services",
    tags=["services"]
)

# --- Get all services
@router.get("/", response_model=list[ServiceResponse])
def get_all_services(db: Session = Depends(get_db)):
    services = db.query(Service).all()
    
    return services

# --- Get a service by slug
@router.get("/{slug}", response_model=ServiceResponse)
def get_service(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug).first()
    
    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )
    
    return service

# --- Create a new service
@router.post("/", response_model=ServiceResponse, status_code=201)
def create_service(service_data: ServiceCreate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    existing_service = db.query(Service).filter(Service.slug == service_data.slug).first()
    
    if existing_service:
        raise HTTPException(
            status_code=400,
            detail="Service slug already exists."
        )
    
    service = Service(**service_data.model_dump())
    
    db.add(service)
    db.commit()
    db.refresh(service)
    
    return service

# --- Update an existing service
@router.patch("/{id}", response_model=ServiceResponse)
def update_service(id: int, service_data: ServiceUpdate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    service = db.query(Service).filter(Service.id == id).first()
    
    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )
    
    update_data = service_data.model_dump(exclude_unset=True)
    
    if "slug" in update_data:
        existing_service = db.query(Service).filter(Service.slug == update_data["slug"], Service.id != service.id).first()
        
        if existing_service:
            raise HTTPException(
                status_code=400,
                detail="Service slug already exists."
            )
    
    for key, value in update_data.items():
        setattr(service, key, value)
    
    db.commit()
    db.refresh(service)
    
    return service

# --- Delete a service
@router.delete("/{id}", status_code=204)
def delete_service(id: int, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    service = db.query(Service).filter(Service.id == id).first()
    
    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )
    
    db.delete(service)
    db.commit()
    
    return
