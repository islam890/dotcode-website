from fastapi import APIRouter

from app.api.v1 import projects, services, testimonials, contact, auth, newsletter

router = APIRouter()

router.include_router(projects.router)
router.include_router(services.router)
router.include_router(testimonials.router)
router.include_router(contact.router)
router.include_router(auth.router)
router.include_router(newsletter.router)
