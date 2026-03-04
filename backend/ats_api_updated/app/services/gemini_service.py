"""
Gemini AI Service
Handles formatting analysis using Gemini API with round-robin key rotation
"""

import os
import time
import tempfile
from pathlib import Path
from google import genai
from google.genai import types
from app.config import settings, key_rotator


class GeminiService:
    """Service for analyzing resume formatting with Gemini"""
    
    def __init__(self):
        self.model_name = settings.GEMINI_MODEL
    
    def analyze(
        self,
        file_content: bytes,
        filename: str,
        target_role: str = ""
    ) -> dict:
        """
        Analyze resume formatting
        
        Args:
            file_content: File bytes
            filename: Original filename
            target_role: Optional target role
            
        Returns:
            Analysis results as dict
        """
        extension = Path(filename).suffix.lower()
        
        if extension == '.pdf':
            return self._analyze_pdf(file_content, target_role)
        else:
            return self._analyze_docx(target_role)
    
    def _analyze_pdf(self, file_content: bytes, target_role: str) -> dict:
        """Analyze PDF formatting with vision"""
        try:
            # Get API key from rotator (round-robin)
            api_key = key_rotator.get_gemini_key()
            client = genai.Client(api_key=api_key)
            
            # Save to temp file for upload
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
                tmp_file.write(file_content)
                tmp_path = tmp_file.name
            
            try:
                # Upload file
                uploaded_file = client.files.upload(path=tmp_path)
                
                # Wait for processing
                while uploaded_file.state == "PROCESSING":
                    time.sleep(1)
                    uploaded_file = client.files.get(name=uploaded_file.name)
                
                if uploaded_file.state == "FAILED":
                    raise ValueError("File processing failed")
                
                # Create prompt
                context = f"\nTarget Role: {target_role}" if target_role else ""
                prompt = self._create_prompt(context)
                
                # Generate analysis
                response = client.models.generate_content(
                    model=self.model_name,
                    contents=[uploaded_file, prompt],
                    config=types.GenerateContentConfig(
                        temperature=0.3,
                        response_mime_type="application/json"
                    )
                )
                
                import json
                return json.loads(response.text)
                
            finally:
                # Clean up temp file
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
        
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return None
    
    def _analyze_docx(self, target_role: str) -> dict:
        """Return limited analysis for DOCX (no visual access)"""
        return {
            "formatting_score": 75,
            "visual_assessment": {
                "layout": "Standard DOCX format",
                "typography": "Cannot assess visually",
                "spacing": "Standard document spacing",
                "ats_compatibility": "DOCX is generally ATS-compatible"
            },
            "strengths": ["Standard format"],
            "issues": ["Visual formatting cannot be fully assessed from DOCX"]
        }
    
    def _create_prompt(self, context: str) -> str:
        """Create prompt for formatting analysis"""
        return f"""You are an ATS formatting expert. Analyze ONLY the visual presentation.

CONTEXT:{context}

Provide CONCISE feedback on formatting issues and improvements.

Return ONLY this JSON:
{{
  "formatting_score": <0-100>,
  "visual_assessment": {{
    "layout": "<1 sentence assessment>",
    "typography": "<1 sentence assessment>",
    "spacing": "<1 sentence assessment>",
    "ats_compatibility": "<1 sentence: how ATS-friendly is it>"
  }},
  "strengths": [<top 2-3 formatting strengths>],
  "issues": [<top 2-3 formatting issues or improvements>]
}}

Be concise. Focus on what needs improvement."""


# Global service instance
gemini_service = GeminiService()
