"""
Main FastAPI Application
Entry point for the ATS Resume Scorer API
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analysis, health
from app.config import settings, key_rotator

# Initialize FastAPI app
app = FastAPI(
    title="ATS Resume Scorer API",
    description="AI-powered resume analysis with Groq + Gemini (Round-Robin Key Rotation)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])


if __name__ == "__main__":
    import uvicorn
    
    groq_count = key_rotator.get_groq_key_count()
    gemini_count = key_rotator.get_gemini_key_count()
    
    print("=" * 70)
    print("🚀 ATS RESUME SCORER API (ROUND-ROBIN)")
    print("=" * 70)
    print(f"\n✅ Groq API Keys: {groq_count} configured")
    print(f"   → Rotation: {'Round-Robin' if groq_count > 1 else 'Single Key'}")
    print(f"\n✅ Gemini API Keys: {gemini_count} configured")
    print(f"   → Rotation: {'Round-Robin' if gemini_count > 1 else 'Single Key'}")
    print(f"\n⚡ Rate Limit: {settings.RATE_LIMIT} requests per IP per {settings.RATE_LIMIT_HOURS} hours")
    print(f"   → Effective Limit: {settings.RATE_LIMIT * min(groq_count, gemini_count) if groq_count > 0 and gemini_count > 0 else settings.RATE_LIMIT} (with key rotation)")
    print(f"\n🌐 Starting server on http://localhost:8000")
    print(f"📚 API Docs: http://localhost:8000/docs")
    print("=" * 70)
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
