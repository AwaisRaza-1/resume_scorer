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
    allow_origins=["https://resumescorer-self.vercel.app", "http://localhost:3000"],  # remove trailing slash
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])