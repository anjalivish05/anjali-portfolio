try:
    import truststore
    truststore.inject_into_ssl()
except ImportError:
    pass

from contextlib import asynccontextmanager
from datetime import datetime, timezone
import logging
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from backend.app.config import settings
from backend.app.database import engine, Base
from backend.app.limiter import limiter
from backend.app.models import contact, analytics  # noqa: F401
from backend.app.routers.contact import router as contact_router
from backend.app.routers.analytics import router as analytics_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("portfolio.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema is present on startup
    logger.info("Initializing database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables initialized successfully.")
    except Exception as exc:
        logger.error(f"Error initializing database tables: {exc}")
    yield


app = FastAPI(
    title="Anjali Vishwakarma - Developer Portfolio API",
    description="Lightweight backend for contact inquiries, email dispatch, and privacy analytics.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/api/redoc" if settings.ENVIRONMENT == "development" else None,
)

# Connect slowapi rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Forward proxy headers in production (Render, Vercel, Cloudflare)
if settings.ENVIRONMENT == "production":
    app.add_middleware(ProxyHeadersMiddleware, trusted_hosts=["*"])

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# Include Routers
app.include_router(contact_router)
app.include_router(analytics_router)


@app.get("/api/health", tags=["Health"])
async def health_check():
    """Service health and readiness check."""
    return {
        "status": "healthy",
        "service": "anjali-portfolio-backend",
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
