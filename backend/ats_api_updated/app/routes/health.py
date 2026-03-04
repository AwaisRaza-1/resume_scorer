"""
Health Check Routes
Simple endpoints for API health monitoring
"""

from fastapi import APIRouter
from app.config import settings, key_rotator

router = APIRouter()


@router.get("/")
async def root():
    """Root endpoint - health check"""
    return {
        "status": "online",
        "service": "ATS Resume Scorer API",
        "version": "1.0.0"
    }


@router.get("/health")
async def health_check():
    """Detailed health check"""
    groq_count = key_rotator.get_groq_key_count()
    gemini_count = key_rotator.get_gemini_key_count()
    
    return {
        "status": "healthy",
        "services": {
            "groq": {
                "status": "configured" if groq_count > 0 else "not_configured",
                "keys_count": groq_count,
                "rotation": "round-robin" if groq_count > 1 else "single"
            },
            "gemini": {
                "status": "configured" if gemini_count > 0 else "not_configured",
                "keys_count": gemini_count,
                "rotation": "round-robin" if gemini_count > 1 else "single"
            }
        },
        "rate_limit": {
            "limit": settings.RATE_LIMIT,
            "window_hours": settings.RATE_LIMIT_HOURS
        }
    }
