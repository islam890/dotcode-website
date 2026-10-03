from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Project, Admin
from app.schema.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse
)
from app.api.v1.dependencies import get_current_admin

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

# --- Create a new project
@router.post("/", response_model=ProjectResponse, status_code=201)
def create_project(project_data: ProjectCreate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    existing_project = db.query(Project).filter(Project.slug == project_data.slug).first()
    
    if existing_project:
        raise HTTPException(
            status_code=400,
            detail="Project slug already exists."
        )
    
    project = Project(**project_data.model_dump())
    
    db.add(project)  
    db.commit()  
    db.refresh(project)
    
    return project

# --- Update an existing project
@router.patch("/{slug}", response_model=ProjectResponse)
def update_project(slug: str, project_data: ProjectUpdate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    project = db.query(Project).filter(Project.slug == slug).first()
    
    if not project:
        raise HTTPException(
            status_code=404, 
            detail="Project not found."
        )
    
    update_data = project_data.model_dump(exclude_unset=True)
    
    if "slug" in update_data:
        existing_project = db.query(Project).filter(Project.slug == update_data["slug"], Project.id != project.id).first()
        
        if existing_project:
            raise HTTPException(
                status_code=400,
                detail="Project with this slug already exists."
            )
    
    for key, value in update_data.items():
        setattr(project, key, value)
    
    db.commit()
    db.refresh(project)
    
    return project

# --- Delete a project
@router.delete("/{slug}", status_code=204)
def delete_project(slug: str, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    project = db.query(Project).filter(Project.slug == slug).first()
    
    if not project:
        raise HTTPException(
            status_code=404, 
            detail="Project not found."
        )
    
    db.delete(project)
    db.commit()
    
    return
