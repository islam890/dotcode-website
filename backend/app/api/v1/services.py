from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Service
from app.schema.services import ServiceResponse

router = APIRouter(
    prefix="/services",
    tags=["services"]
)

# --- Get all services
@router.get("/", response_model=list[ServiceResponse])
def get_all_services(db: Session = Depends(get_db)):
    services = (
        db.query(Service)
        .filter(Service.published.is_(True))
        .order_by(Service.order.asc(), Service.id.asc())
        .all()
    )
    
    return services

# --- Get a service by slug
@router.get("/{slug}", response_model=ServiceResponse)
def get_service(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(
        Service.slug == slug,
        Service.published.is_(True),
    ).first()
    
    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )
    
    return service
