from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Project
from app.schema.project import ProjectResponse

router = APIRouter(
    prefix="/projects",
    tags=["projects"]
)

# --- Get all projects
@router.get("/", response_model=list[ProjectResponse])
def get_all_projects(db: Session = Depends(get_db)):
    projects = (
        db.query(Project)
        .filter(Project.published.is_(True))
        .order_by(Project.featured.desc(), Project.created_at.desc(), Project.id.desc())
        .all()
    )
    
    return projects

# --- Get a project by slug
@router.get("/{slug}", response_model=ProjectResponse)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(
        Project.slug == slug,
        Project.published.is_(True),
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=404, 
            detail="Project not found."
        )
    
    return project
