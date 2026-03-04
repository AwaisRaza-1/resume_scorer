"""
Analysis Routes
Main endpoints for resume analysis
"""

from fastapi import APIRouter, File, UploadFile, HTTPException, Request, Form
from fastapi.responses import JSONResponse
from typing import Optional
from datetime import datetime
from app.services.analyzer_service import analyzer_service
from app.utils.rate_limiter import rate_limiter
from app.utils.file_processor import FileProcessor
from app.config import settings, key_rotator

router = APIRouter()


@router.get("/rate-limit")
async def check_rate_limit(request: Request):
    """Check remaining requests for client IP"""
    client_ip = request.client.host
    remaining = rate_limiter.get_remaining(client_ip)
    
    return {
        "ip": client_ip,
        "remaining_requests": remaining,
        "limit": settings.RATE_LIMIT,
        "window_hours": settings.RATE_LIMIT_HOURS
    }


@router.post("/analyze")
async def analyze_resume(
    request: Request,
    file: UploadFile = File(..., description="Resume file (PDF or DOCX)"),
    job_description: Optional[str] = Form(None, description="Job description text"),
    target_role: Optional[str] = Form(None, description="Target role (e.g., 'ML Internship')")
):
    """
    Analyze resume and return ATS score with feedback
    
    - **file**: Resume file (PDF or DOCX, max 10MB)
    - **job_description**: Optional full job description for tailored analysis
    - **target_role**: Optional target role for context-aware scoring
    
    Returns comprehensive ATS analysis with:
    - Overall score (0-100)
    - Formatting analysis (from Gemini vision)
    - Keywords and content analysis (from Groq)
    - Actionable recommendations
    """
    
    # Get client IP
    client_ip = request.client.host
    
    # Check rate limit
    allowed, remaining = rate_limiter.check_limit(client_ip)
    
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Rate limit exceeded",
                "message": f"You have used all {settings.RATE_LIMIT} requests. Try again in {settings.RATE_LIMIT_HOURS} hours.",
                "limit": settings.RATE_LIMIT,
                "window_hours": settings.RATE_LIMIT_HOURS
            }
        )
    
    # Validate API keys
    groq_count = key_rotator.get_groq_key_count()
    gemini_count = key_rotator.get_gemini_key_count()
    
    if groq_count == 0 or gemini_count == 0:
        raise HTTPException(
            status_code=500,
            detail="API keys not configured on server"
        )
    
    # Validate file type
    if not FileProcessor.validate_file(file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Supported: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )
    
    try:
        # Read file
        file_content = await file.read()
        
        # Check file size
        if len(file_content) > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE / 1024 / 1024}MB"
            )
        
        # Analyze resume
        analysis_result = analyzer_service.analyze_resume(
            file_content=file_content,
            filename=file.filename,
            job_description=job_description,
            target_role=target_role
        )
        
        # Add metadata
        analysis_result["metadata"] = {
            "remaining_requests": remaining,
            "filename": file.filename,
            "timestamp": datetime.now().isoformat(),
            "ip": client_ip
        }
        
        return JSONResponse(content=analysis_result)
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        )
