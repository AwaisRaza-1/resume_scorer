"""
Configuration and Settings
Loads environment variables and app configuration with round-robin key rotation
"""

import os
from datetime import timedelta
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pathlib import Path
import itertools

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # API Keys - Support multiple keys for round-robin
    GROQ_API_KEY_1: str = ""
    GROQ_API_KEY_2: str = ""
    GEMINI_API_KEY_1: str = ""
    GEMINI_API_KEY_2: str = ""
    
    # Rate Limiting
    RATE_LIMIT: int = 7
    RATE_LIMIT_HOURS: int = 24
    
    # File Upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS: list = [".pdf", ".docx", ".doc"]
    
    # AI Models
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    GEMINI_MODEL: str = "gemini-2.0-flash"
    
    # API Settings
    API_TIMEOUT: int = 60
    
    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        case_sensitive=True,
        extra="allow"
    )
    
    def get_groq_keys(self) -> List[str]:
        """Get all configured Groq API keys"""
        keys = []
        if self.GROQ_API_KEY_1:
            keys.append(self.GROQ_API_KEY_1)
        if self.GROQ_API_KEY_2:
            keys.append(self.GROQ_API_KEY_2)
        return keys
    
    def get_gemini_keys(self) -> List[str]:
        """Get all configured Gemini API keys"""
        keys = []
        if self.GEMINI_API_KEY_1:
            keys.append(self.GEMINI_API_KEY_1)
        if self.GEMINI_API_KEY_2:
            keys.append(self.GEMINI_API_KEY_2)
        return keys


# Create global settings instance
settings = Settings()


class KeyRotator:
    """Round-robin key rotator for API keys"""
    
    def __init__(self):
        self.groq_keys = settings.get_groq_keys()
        self.gemini_keys = settings.get_gemini_keys()
        
        # Create iterators for round-robin
        self.groq_iterator = itertools.cycle(self.groq_keys) if self.groq_keys else None
        self.gemini_iterator = itertools.cycle(self.gemini_keys) if self.gemini_keys else None
    
    def get_groq_key(self) -> str:
        """Get next Groq API key in rotation"""
        if not self.groq_iterator:
            raise ValueError("No Groq API keys configured")
        return next(self.groq_iterator)
    
    def get_gemini_key(self) -> str:
        """Get next Gemini API key in rotation"""
        if not self.gemini_iterator:
            raise ValueError("No Gemini API keys configured")
        return next(self.gemini_iterator)
    
    def get_groq_key_count(self) -> int:
        """Get number of Groq keys configured"""
        return len(self.groq_keys)
    
    def get_gemini_key_count(self) -> int:
        """Get number of Gemini keys configured"""
        return len(self.gemini_keys)


# Global key rotator instance
key_rotator = KeyRotator()


def validate_settings():
    """Validate that required settings are present"""
    groq_count = key_rotator.get_groq_key_count()
    gemini_count = key_rotator.get_gemini_key_count()
    
    if groq_count == 0:
        print("⚠️  WARNING: No Groq API keys configured!")
    else:
        print(f"✅ Loaded {groq_count} Groq API key(s)")
    
    if gemini_count == 0:
        print("⚠️  WARNING: No Gemini API keys configured!")
    else:
        print(f"✅ Loaded {gemini_count} Gemini API key(s)")


# Validate on import
validate_settings()
