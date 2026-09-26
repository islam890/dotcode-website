from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.database import settings
from app.api.v1.router import router as api_router
from app.core.exceptions import global_exception_handler
from app.core.limiter import limiter


app = FastAPI(title=settings.app_name)

app.add_exception_handler(
    Exception, 
    global_exception_handler
)

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

app.add_middleware(
    CORSMiddleware,
    allow_origin=[
        "http://localhost:3000"
    ],
    allow_credantials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    api_router,
    prefix="/api/v1",
)

@app.get("/")
def root():
    return {
        "message": "DotCode API is running!",
        "environment": settings.app_env,
    }