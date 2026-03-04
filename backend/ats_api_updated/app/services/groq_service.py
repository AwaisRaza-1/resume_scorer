"""
Groq AI Service
Handles content analysis using Groq API with round-robin key rotation
"""

import requests
import json
from app.config import settings, key_rotator


class GroqService:
    """Service for analyzing resume content with Groq"""
    
    def __init__(self):
        self.model = settings.GROQ_MODEL
        self.url = "https://api.groq.com/openai/v1/chat/completions"
    
    def analyze(
        self,
        resume_text: str,
        job_description: str = "",
        target_role: str = ""
    ) -> dict:
        """
        Analyze resume content
        
        Args:
            resume_text: Extracted resume text
            job_description: Optional job description
            target_role: Optional target role
            
        Returns:
            Analysis results as dict
        """
        # Get API key from rotator (round-robin)
        api_key = key_rotator.get_groq_key()
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        # Build context
        context_info = self._build_context(job_description, target_role)
        
        # Create prompts
        system_prompt = self._create_system_prompt(context_info)
        user_prompt = f"Analyze this resume:\n\n{resume_text}"
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 3000,
            "response_format": {"type": "json_object"}
        }
        
        try:
            response = requests.post(
                self.url,
                headers=headers,
                json=payload,
                timeout=settings.API_TIMEOUT
            )
            response.raise_for_status()
            
            result = response.json()
            
            if "choices" in result and len(result["choices"]) > 0:
                content = result["choices"][0]["message"]["content"]
                return json.loads(content)
            
            return None
            
        except Exception as e:
            print(f"Groq API Error: {e}")
            return None
    
    def _build_context(self, job_description: str, target_role: str) -> str:
        """Build context information string"""
        context_parts = []
        
        if job_description:
            context_parts.append(f"JOB DESCRIPTION:\n{job_description}")
        
        if target_role:
            context_parts.append(f"TARGET ROLE: {target_role}")
        
        if not context_parts:
            return "NO CONTEXT PROVIDED - Infer the target role/level from the resume."
        
        return "\n".join(context_parts)
    
    def _create_system_prompt(self, context_info: str) -> str:
        """Create system prompt for analysis"""
        return f"""You are an expert ATS analyzer. Provide CONCISE, actionable feedback.

CONTEXT:
{context_info}

INSTRUCTIONS:
1. If no context: Infer the role/level (internship/entry/mid/senior) from experience and education
2. Adjust expectations for that level (don't penalize interns for no work experience)
3. Focus on GAPS and IMPROVEMENTS, not describing what's already there
4. Be direct and specific

Return ONLY valid JSON:
{{
  "role_inference": "<inferred level if no context, else 'Based on provided context'>",
  "keywords": {{
    "score": <0-100>,
    "found": [<top 8 relevant keywords>],
    "missing": [<top 3-5 critical missing keywords for this role>],
    "jd_match_percentage": <0-100 if JD provided, else null>
  }},
  "sections": {{
    "score": <0-100>,
    "present": [<section names>],
    "missing": [<missing sections appropriate for level>],
    "notes": "<1 sentence explaining if missing sections are acceptable>"
  }},
  "content_quality": {{
    "score": <0-100>,
    "strengths": [<top 3 strengths>],
    "improvements": [<top 3 actionable improvements>]
  }},
  "recommendations": [<3-4 most important actions to improve ATS score>]
}}

Keep it concise. Focus on feedback, not description."""


# Global service instance
groq_service = GroqService()
