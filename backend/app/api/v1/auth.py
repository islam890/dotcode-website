from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.security import verify_password, create_access_token
from app.database import get_db, settings
from app.models import Admin
from app.schemas.admin import AdminLogin, TokenResponse
from app.api.v1.dependencies import get_current_admin
from app.core.limiter import limiter


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

# --- Admin login
@router.post("/login", response_model=TokenResponse)
@limiter.limit("5/minute")
def login(request: Request, login_data: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == login_data.email).first()
    
    if not admin:
        raise HTTPException(
            status_code = 401,
            detail = "Invalid email or password."
        )
    
    if not admin.is_active:
        raise HTTPException(
            status_code = 403,
            detail = "Admin account is inactive."
        )
    
    if not verify_password(login_data.password, admin.password_hash):
        raise HTTPException(
            status_code = 401,
            detail = "Invalid email or password."
        )
    
    access_token = create_access_token(data={
        "sub": str(admin.id),
        "email": admin.email
        },
        secret_key = settings.jwt_secret_key,
        algorithm = settings.jwt_algorithm,
        expires_minutes = settings.jwt_access_token_expire_minutes
    )
    
    return {
        "access_token" : access_token, 
        "token_type" : "bearer"
    }

# --- Create a new admin
@router.get("/me")
def get_me(current_admin: Admin = Depends(get_current_admin)):
    return {
        "id": current_admin.id,
        "name": current_admin.name,
        "email": current_admin.email,
        "is_active": current_admin.is_active,
    }