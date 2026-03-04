"""
Analyzer Service
Orchestrates parallel analysis and combines results
"""

import threading
from typing import Optional
from app.services.groq_service import groq_service
from app.services.gemini_service import gemini_service
from app.utils.file_processor import FileProcessor


class AnalyzerService:
    """Orchestrates resume analysis using multiple AI services"""
    
    def __init__(self):
        self.groq = groq_service
        self.gemini = gemini_service
        self.file_processor = FileProcessor()
    
    def analyze_resume(
        self,
        file_content: bytes,
        filename: str,
        job_description: Optional[str] = None,
        target_role: Optional[str] = None
    ) -> dict:
        """
        Perform complete resume analysis
        
        Args:
            file_content: Resume file bytes
            filename: Original filename
            job_description: Optional JD text
            target_role: Optional target role
            
        Returns:
            Combined analysis results
        """
        # Extract text
        resume_text = self.file_processor.extract_text(file_content, filename)
        
        if not resume_text:
            raise ValueError("Could not extract text from file")
        
        # Parallel analysis
        result_container = {}
        
        # Start Groq thread
        groq_thread = threading.Thread(
            target=self._run_groq_analysis,
            args=(resume_text, job_description or "", target_role or "", result_container)
        )
        
        # Start Gemini thread
        gemini_thread = threading.Thread(
            target=self._run_gemini_analysis,
            args=(file_content, filename, target_role or "", result_container)
        )
        
        groq_thread.start()
        gemini_thread.start()
        
        groq_thread.join()
        gemini_thread.join()
        
        # Combine results
        groq_result = result_container.get('groq')
        gemini_result = result_container.get('gemini')
        
        if not groq_result and not gemini_result:
            raise RuntimeError("Both AI services failed")
        
        return self._combine_results(groq_result, gemini_result)
    
    def _run_groq_analysis(
        self,
        resume_text: str,
        job_description: str,
        target_role: str,
        result_container: dict
    ):
        """Run Groq analysis in thread"""
        try:
            result = self.groq.analyze(resume_text, job_description, target_role)
            result_container['groq'] = result
        except Exception as e:
            print(f"Groq thread error: {e}")
            result_container['groq'] = None
    
    def _run_gemini_analysis(
        self,
        file_content: bytes,
        filename: str,
        target_role: str,
        result_container: dict
    ):
        """Run Gemini analysis in thread"""
        try:
            result = self.gemini.analyze(file_content, filename, target_role)
            result_container['gemini'] = result
        except Exception as e:
            print(f"Gemini thread error: {e}")
            result_container['gemini'] = None
    
    def _combine_results(self, groq_result: dict, gemini_result: dict) -> dict:
        """
        Combine Groq and Gemini results
        
        Args:
            groq_result: Groq analysis results
            gemini_result: Gemini analysis results
            
        Returns:
            Combined analysis dictionary
        """
        # Calculate overall score
        scores = []
        
        if gemini_result and 'formatting_score' in gemini_result:
            scores.append(gemini_result['formatting_score'])
        
        if groq_result:
            if 'keywords' in groq_result:
                scores.append(groq_result['keywords'].get('score', 0))
            if 'sections' in groq_result:
                scores.append(groq_result['sections'].get('score', 0))
            if 'content_quality' in groq_result:
                scores.append(groq_result['content_quality'].get('score', 0))
        
        overall_score = round(sum(scores) / len(scores)) if scores else 0
        
        # Build combined result
        combined = {
            "score": overall_score,
            "details": {}
        }
        
        # Add role inference
        if groq_result and 'role_inference' in groq_result:
            combined["inferred_context"] = groq_result['role_inference']
        
        # Add formatting from Gemini
        if gemini_result:
            combined["details"]["formatting"] = {
                "score": gemini_result.get('formatting_score', 0),
                "visual_assessment": gemini_result.get('visual_assessment', {}),
                "strengths": gemini_result.get('strengths', []),
                "issues": gemini_result.get('issues', [])
            }
        
        # Add content analysis from Groq
        if groq_result:
            if 'keywords' in groq_result:
                combined["details"]["keywords"] = groq_result['keywords']
            if 'sections' in groq_result:
                combined["details"]["sections"] = groq_result['sections']
            if 'content_quality' in groq_result:
                combined["details"]["content_quality"] = groq_result['content_quality']
            if 'recommendations' in groq_result:
                combined["details"]["recommendations"] = groq_result['recommendations']
        
        return combined


# Global analyzer instance
analyzer_service = AnalyzerService()
