"""
Rate Limiting Utility
Manages request rate limits per IP address
"""

from datetime import datetime, timedelta
from collections import defaultdict
from typing import Tuple
from app.config import settings


class RateLimiter:
    """In-memory rate limiter (use Redis in production)"""
    
    def __init__(self):
        self.requests = defaultdict(list)
        self.limit = settings.RATE_LIMIT
        self.window = timedelta(hours=settings.RATE_LIMIT_HOURS)
    
    def _clean_old_requests(self, ip: str):
        """Remove requests outside the time window"""
        now = datetime.now()
        self.requests[ip] = [
            timestamp for timestamp in self.requests[ip]
            if now - timestamp < self.window
        ]
    
    def check_limit(self, ip: str) -> Tuple[bool, int]:
        """
        Check if IP has exceeded rate limit
        
        Returns:
            (allowed: bool, remaining: int)
        """
        self._clean_old_requests(ip)
        
        current_count = len(self.requests[ip])
        remaining = max(0, self.limit - current_count)
        
        if current_count >= self.limit:
            return False, 0
        
        # Add new request
        self.requests[ip].append(datetime.now())
        return True, remaining - 1
    
    def get_remaining(self, ip: str) -> int:
        """Get remaining requests for IP"""
        self._clean_old_requests(ip)
        return max(0, self.limit - len(self.requests[ip]))
    
    def reset(self, ip: str):
        """Reset rate limit for IP (admin use)"""
        self.requests[ip] = []


# Global rate limiter instance
rate_limiter = RateLimiter()
