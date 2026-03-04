"""
File Processing Utility
Handles PDF and DOCX text extraction
"""

import io
from pathlib import Path
import PyPDF2
from docx import Document


class FileProcessor:
    """Processes resume files to extract text"""
    
    @staticmethod
    def extract_from_pdf(file_content: bytes) -> str:
        """Extract text from PDF bytes"""
        text = ""
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        return text.strip()
    
    @staticmethod
    def extract_from_docx(file_content: bytes) -> str:
        """Extract text from DOCX bytes"""
        doc = Document(io.BytesIO(file_content))
        text = ""
        
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        
        return text.strip()
    
    @staticmethod
    def extract_text(file_content: bytes, filename: str) -> str:
        """
        Extract text from file based on extension
        
        Args:
            file_content: File bytes
            filename: Original filename with extension
            
        Returns:
            Extracted text
            
        Raises:
            ValueError: If file type is not supported
        """
        extension = Path(filename).suffix.lower()
        
        if extension == '.pdf':
            return FileProcessor.extract_from_pdf(file_content)
        elif extension in ['.docx', '.doc']:
            return FileProcessor.extract_from_docx(file_content)
        else:
            raise ValueError(f"Unsupported file type: {extension}")
    
    @staticmethod
    def validate_file(filename: str, max_size: int = None) -> bool:
        """
        Validate file type and optionally size
        
        Args:
            filename: File name to validate
            max_size: Maximum file size in bytes (optional)
            
        Returns:
            True if valid, False otherwise
        """
        extension = Path(filename).suffix.lower()
        return extension in ['.pdf', '.docx', '.doc']
